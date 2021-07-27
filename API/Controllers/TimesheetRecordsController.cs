using System.Collections.Generic;
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
    [Route("[controller]")]
    public class TimesheetRecordsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public TimesheetRecordsController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IQueryable<TimesheetRecord>>> GetTimesheetRecords()
        {
            var timesheetRecords = await _context.TimesheetRecords.Include(x => x.TimesheetCard).ToListAsync();
            var timesheetRecordsToReturn = _mapper.Map<IEnumerable<TimesheetRecordToShowDTO>>(timesheetRecords);
            return Ok(timesheetRecordsToReturn);
        }

        [HttpPost]
        public async Task<ActionResult<TimesheetRecord>> PostTimesheetRecord(TimesheetRecordToAddDTO model)
        {
            var mapped = _mapper.Map<TimesheetRecord>(model);

            TimesheetCard findCard = await _context.TimesheetCards.FirstOrDefaultAsync(x => x.TimesheetCardId == model.TimesheetCardId);
            if (findCard == null) return NotFound();
            mapped.TimesheetCard = findCard;

            await _context.TimesheetRecords.AddAsync(mapped);
            await _context.SaveChangesAsync();
            return Ok(mapped);
        }
    }
}