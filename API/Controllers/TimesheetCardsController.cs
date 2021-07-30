using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Models.Timesheets;
using AutoMapper;
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
        public TimesheetsController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IQueryable<TimesheetCard>>> GetTimesheetCards()
        {
            var timesheetCards = await _context.TimesheetCards.Include(x => x.TimesheetWeeks).ThenInclude(x => x.TimesheetRecords).OrderByDescending(x => x.Date).ToListAsync();
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
        public async Task<ActionResult<TimesheetCard>> PostTimesheetCard(TimesheetCardToAddOrUpdateDTO model)
        {
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

            await _context.TimesheetWeeks.AddRangeAsync(listOfWeeks);
            await _context.TimesheetCards.AddAsync(mappedCard);
            await _context.SaveChangesAsync();
            return Ok(model);
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

        [HttpPut("{cardId}")]
        public async Task<ActionResult> EditTimesheetCard(int cardId, [FromBody] TimesheetCardToAddOrUpdateDTO modelDTO)
        {
            var card = await _context.TimesheetCards.FindAsync(cardId);
            if (card == null) return NotFound();
            _mapper.Map(modelDTO, card);
            _context.Entry(card).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(card);
        }

    }


}