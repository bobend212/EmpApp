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
            var timesheetRecords = await _context.TimesheetRecords.Include(x => x.TimesheetWeek).Include(x => x.WorkType).Include(p => p.Project).ToListAsync();
            var timesheetRecordsToReturn = _mapper.Map<IEnumerable<TimesheetRecordToShowDTO>>(timesheetRecords);
            return Ok(timesheetRecordsToReturn);
        }

        [HttpGet("id/{recordId}")]
        public async Task<ActionResult<TimesheetRecord>> GetTimesheetRecordById(int recordId)
        {
            var record = await _context.TimesheetRecords.Include(x => x.TimesheetWeek).Include(x => x.WorkType).Include(p => p.Project).FirstOrDefaultAsync(x => x.TimesheetRecordId == recordId);
            if (record == null) return NotFound();
            return Ok(_mapper.Map<TimesheetRecordToAddDTO>(record));
        }

        [HttpGet("{weekId}")]
        public async Task<ActionResult<IQueryable<TimesheetRecord>>> GetTimesheetRecordsByWeekId(int weekId)
        {
            TimesheetWeek findWeek = await _context.TimesheetWeeks.Include(x => x.TimesheetRecords).ThenInclude(x => x.WorkType).FirstOrDefaultAsync(x => x.TimesheetWeekId == weekId);
            if (findWeek == null) return NotFound();

            var timesheetRecords = await _context.TimesheetRecords.Include(x => x.WorkType).Include(p => p.Project)
                .Where(x => x.TimesheetWeek.TimesheetWeekId == findWeek.TimesheetWeekId).ToListAsync();

            var timesheetRecordsToReturn = _mapper.Map<IEnumerable<TimesheetRecordToShowDTO>>(timesheetRecords);
            return Ok(timesheetRecordsToReturn);
        }

        [HttpPost]
        public async Task<ActionResult<TimesheetRecord>> PostTimesheetRecord([FromBody] TimesheetRecordToAddDTO modelDTO)
        {
            if (!ProjectExist(modelDTO.ProjectId) && modelDTO.ProjectId != null) return NotFound("Project does not exist");
            if (!WorkTypeExist(modelDTO.WorkTypeId)) return NotFound("Work Type does not exist");
            if (!TimesheetWeekExist(modelDTO.TimesheetWeekId)) return NotFound("Provided Timesheet Week does not exist");

            var mapped = _mapper.Map<TimesheetRecord>(modelDTO);

            TimesheetWeek findWeek = await _context.TimesheetWeeks.Include(x => x.TimesheetCard).FirstOrDefaultAsync(x => x.TimesheetWeekId == modelDTO.TimesheetWeekId);
            if (findWeek == null) return NotFound();

            TimesheetCard findCard = await _context.TimesheetCards.Include(x => x.TimesheetWeeks).FirstOrDefaultAsync(x => x.TimesheetCardId == findWeek.TimesheetCard.TimesheetCardId);
            if (findCard == null) return NotFound();

            mapped.TimesheetWeek = findWeek;
            findWeek.TotalWeekly += modelDTO.Time;

            float total = findCard.TimesheetWeeks.Sum(x => x.TotalWeekly);
            findCard.TotalTime = total;

            mapped.WorkTypeId = modelDTO.WorkTypeId;

            await _context.TimesheetRecords.AddAsync(mapped);
            await _context.SaveChangesAsync();
            return Ok(modelDTO);
        }

        [HttpDelete("{recordId}")]
        public async Task<ActionResult> DeleteTimesheetRecord(int recordId)
        {
            var findRecord = await _context.TimesheetRecords.Include(x => x.TimesheetWeek).FirstOrDefaultAsync(x => x.TimesheetRecordId == recordId);
            if (findRecord == null) return NotFound();

            TimesheetWeek findWeek = await _context.TimesheetWeeks.Include(x => x.TimesheetCard).FirstOrDefaultAsync(x => x.TimesheetWeekId == findRecord.TimesheetWeek.TimesheetWeekId);
            if (findWeek == null) return NotFound();
            findWeek.TotalWeekly -= findRecord.Time;

            TimesheetCard findCard = await _context.TimesheetCards.Include(x => x.TimesheetWeeks).FirstOrDefaultAsync(x => x.TimesheetCardId == findWeek.TimesheetCard.TimesheetCardId);
            if (findCard == null) return NotFound();

            float total = findCard.TimesheetWeeks.Sum(x => x.TotalWeekly);
            findCard.TotalTime = total;

            _context.TimesheetRecords.Remove(findRecord);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{recordId}")]
        public async Task<ActionResult> EditTimesheetRecord(int recordId, [FromBody] TimesheetRecordToUpdateDTO modelDTO)
        {
            var record = await _context.TimesheetRecords.Include(x => x.TimesheetWeek).FirstOrDefaultAsync(x => x.TimesheetRecordId == recordId);
            if (record == null) return NotFound();

            TimesheetWeek findWeek = await _context.TimesheetWeeks.Include(x => x.TimesheetCard).FirstOrDefaultAsync(x => x.TimesheetWeekId == record.TimesheetWeek.TimesheetWeekId);
            if (findWeek == null) return NotFound();
            findWeek.TotalWeekly -= record.Time;
            record.Time = modelDTO.Time;
            findWeek.TotalWeekly += modelDTO.Time;

            TimesheetCard findCard = await _context.TimesheetCards.Include(x => x.TimesheetWeeks).FirstOrDefaultAsync(x => x.TimesheetCardId == findWeek.TimesheetCard.TimesheetCardId);
            if (findCard == null) return NotFound();

            float total = findCard.TimesheetWeeks.Sum(x => x.TotalWeekly);
            findCard.TotalTime = total;

            _mapper.Map(modelDTO, record);
            _context.Entry(record).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok();
        }

        private bool ProjectExist(int? projectId) => _context.Projects.Any(e => e.ProjectId == projectId);
        private bool WorkTypeExist(int workTypeId) => _context.WorkTypes.Any(e => e.WorkTypeId == workTypeId);
        private bool TimesheetWeekExist(int timesheetWeekId) => _context.TimesheetWeeks.Any(e => e.TimesheetWeekId == timesheetWeekId);

    }
}