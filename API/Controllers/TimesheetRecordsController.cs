using System;
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
    [Route("timesheet/records")]
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
            findCard.TotalTime += model.Time;

            await _context.TimesheetRecords.AddAsync(mapped);
            await _context.SaveChangesAsync();
            return Ok(mapped);
        }

        [HttpDelete("{recordId}")]
        public async Task<ActionResult> DeleteTimesheetRecord(int recordId)
        {
            var record = await _context.TimesheetRecords.Include(x => x.TimesheetCard).FirstOrDefaultAsync(x => x.TimesheetRecordId == recordId);
            if (record == null) return NotFound();

            TimesheetCard findCard = await _context.TimesheetCards.FindAsync(record.TimesheetCard.TimesheetCardId);
            if (findCard == null) return NotFound();
            findCard.TotalTime -= record.Time;

            _context.TimesheetRecords.Remove(record);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{recordId}")]
        public async Task<ActionResult> EditTimesheetRecord(int recordId, [FromBody] TimesheetRecordToUpdateDTO modelDTO)
        {
            var record = await _context.TimesheetRecords.Include(x => x.TimesheetCard).FirstOrDefaultAsync(x => x.TimesheetRecordId == recordId);
            if (record == null) return NotFound();

            TimesheetCard findCard = await _context.TimesheetCards.FindAsync(record.TimesheetCard.TimesheetCardId);
            if (findCard == null) return NotFound();
            findCard.TotalTime -= record.Time;
            record.Time = modelDTO.Time;
            findCard.TotalTime += modelDTO.Time;

            _mapper.Map(modelDTO, record);
            _context.Entry(record).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(record);
        }
    }
}