using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Models.Timesheets;
using API.Models.Users;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("timesheet/cards")]
    public class TimesheetsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        public TimesheetsController(DataContext context, IMapper mapper, UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IQueryable<TimesheetCardToShowDTO>>> GetTimesheetCards()
        {
            var timesheetCards = await _context.TimesheetCards.Include(x => x.AppUser)
                .Include(x => x.TimesheetWeeks).ThenInclude(x => x.TimesheetRecords)
                .AsSplitQuery()
                .OrderByDescending(x => x.Date).ToListAsync();

            var mappedCards = _mapper.Map<IEnumerable<TimesheetCardToShowDTO>>(timesheetCards);
            return Ok(mappedCards);
        }

        [HttpGet("my/{userId}")]
        public async Task<ActionResult<IQueryable<TimesheetCard>>> GetTimesheetCardsByUsername(int userId)
        {
            var timesheetCards = await _context.TimesheetCards.Include(x => x.TimesheetWeeks).ThenInclude(x => x.TimesheetRecords)
            .OrderByDescending(x => x.Date)
            .Where(x => x.AppUser.Id == userId)
            .AsSingleQuery()
            .ToListAsync();

            return Ok(timesheetCards);
        }

        [HttpGet("{cardId}")]
        public async Task<ActionResult<TimesheetCard>> GetTimesheetCardById(int cardId)
        {
            var card = await _context.TimesheetCards.Include(x => x.TimesheetWeeks).ThenInclude(x => x.TimesheetRecords).FirstOrDefaultAsync(x => x.TimesheetCardId == cardId);
            if (card == null) return NotFound();
            return Ok(card);
        }

        [HttpPost]
        public async Task<ActionResult<TimesheetCard>> PostTimesheetCard(TimesheetCardToAddDTO model)
        {
            if (!UserExist(model.AppUserId)) return NotFound("User does not exist");
            if (!TimesheetCardExist(model.AppUserId, model.Date)) return BadRequest("This Card already exist");

            if (!ModelState.IsValid) return BadRequest("invalid model state");

            var mappedCard = _mapper.Map<TimesheetCard>(model);

            var firstDay = FirstDayOfWeek(model.Date);

            List<TimesheetWeek> listOfWeeks = new List<TimesheetWeek>();

            for (int i = 0; i < 6; i++)
            {
                var weekNo = CultureInfo.InvariantCulture.Calendar.GetWeekOfYear(firstDay, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);
                TimesheetWeek newWeek = new TimesheetWeek
                {
                    StartWeek = firstDay,
                    EndWeek = firstDay.AddDays(6),
                    WeekNo = weekNo,
                    TimesheetCard = mappedCard
                };
                listOfWeeks.Add(newWeek);

                firstDay = firstDay.AddDays(7);
            }

            mappedCard.Status = "None";

            await _context.TimesheetWeeks.AddRangeAsync(listOfWeeks);
            await _context.TimesheetCards.AddAsync(mappedCard);
            await _context.SaveChangesAsync();
            return Ok(mappedCard);
        }

        private bool TimesheetCardExist(int userId, DateTime date)
        {
            var findUser = _userManager.Users.Include(x => x.TimesheetCards).SingleOrDefaultAsync(x => x.Id == userId);
            var findCard = findUser.Result.TimesheetCards.FirstOrDefault(x => x.Date == date);
            if (findCard != null) return false;
            return true;
        }

        public static DateTime FirstDayOfWeek(DateTime dt)
        {
            var culture = System.Threading.Thread.CurrentThread.CurrentCulture;
            var diff = dt.DayOfWeek - culture.DateTimeFormat.FirstDayOfWeek;
            if (diff < 0)
                diff += 7;
            return dt.AddDays(-diff).Date;
        }

        [HttpDelete("{cardId}")]
        public async Task<ActionResult> DeleteTimesheetCard(int cardId)
        {
            var card = await _context.TimesheetCards.FirstOrDefaultAsync(x => x.TimesheetCardId == cardId);
            if (card == null) return NotFound();
            _context.TimesheetCards.Remove(card);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // [HttpPut("{cardId}")]
        // public async Task<ActionResult> EditTimesheetCard(int cardId, [FromBody] TimesheetCardToUpdateDTO modelDTO)
        // {
        //     var card = await _context.TimesheetCards.FindAsync(cardId);
        //     if (card == null) return NotFound();
        //     _mapper.Map(modelDTO, card);
        //     _context.Entry(card).State = EntityState.Modified;
        //     await _context.SaveChangesAsync();
        //     return Ok(card);
        // }

        [HttpPut("status/update")]
        public async Task<ActionResult> AcceptTimesheetCardStatus([FromBody] TimesheetCardStatusUpdateDTO modelDTO)
        {
            var card = await _context.TimesheetCards.FindAsync(modelDTO.TimesheetCardId);
            if (card == null) return NotFound();

            _mapper.Map(modelDTO, card);
            _context.Entry(card).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(card);
        }

        private bool UserExist(int userId) => _context.Users.Any(e => e.Id == userId);

    }


}
