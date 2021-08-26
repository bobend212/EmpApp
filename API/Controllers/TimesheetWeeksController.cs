using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Models.Timesheets;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("timesheet/week")]
    public class TimesheetWeeksController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public TimesheetWeeksController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [Authorize]
        [HttpGet("{cardId}")]
        public async Task<ActionResult<IQueryable<TimesheetWeek>>> GetTimesheetWeeksByCardId(int cardId)
        {
            TimesheetCard findCard = await _context.TimesheetCards.Include(x => x.TimesheetWeeks).ThenInclude(x => x.TimesheetRecords).FirstOrDefaultAsync(x => x.TimesheetCardId == cardId);
            if (findCard == null) return NotFound();

            var timesheetWeeks = await _context.TimesheetWeeks
                .Where(x => x.TimesheetCard.TimesheetCardId == findCard.TimesheetCardId).ToListAsync();

            var timesheetRecordsToReturn = _mapper.Map<IEnumerable<TimesheetWeeksToShowDTO>>(timesheetWeeks);
            return Ok(timesheetRecordsToReturn);
        }

        [HttpGet("{weekId}/details")]
        public async Task<ActionResult<TimesheetWeek>> GetTimesheetWeekById(int weekId)
        {
            var week = await _context.TimesheetWeeks.FirstOrDefaultAsync(x => x.TimesheetWeekId == weekId);
            if (week == null) return NotFound();
            return Ok(week);
        }
    }
}