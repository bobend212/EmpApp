using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs.WorkloadDTOs;
using API.Models.Projects;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkloadController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public WorkloadController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<WorkloadToShowDTO>>> GetAllWorkloads()
        {
            var workloads = await _context.Workloads.Include(x => x.Project).ToListAsync();
            var mappedWorkloads = _mapper.Map<IEnumerable<WorkloadToShowDTO>>(workloads);
            return Ok(mappedWorkloads);
        }

        [HttpGet("chart-data")]
        public async Task<ActionResult<IEnumerable<WorkloadToShowDTO>>> GetAllWorkloadsData()
        {
            var workloads = await _context.Workloads.Include(x => x.Project).ToListAsync();
            var mappedWorkloads = _mapper.Map<IEnumerable<WorkloadToShowDTO>>(workloads);

            string[] monthNames = DateTimeFormatInfo.CurrentInfo.MonthNames;

            var mappedWorkloadsData = monthNames.GroupBy(x => x).Select(v => new
            {
                required = mappedWorkloads.Where(x => x.FullSetRequired.HasValue && x.FullSetRequired.Value.ToString("MMMM") == v.Key).Count(),
                estimated = mappedWorkloads.Where(x => x.FullSetEstimated.HasValue && x.FullSetEstimated.Value.ToString("MMMM") == v.Key).Count(),
                delivered = mappedWorkloads.Where(x => x.FullSetIssued.HasValue && x.FullSetIssued.Value.ToString("MMMM") == v.Key).Count()
            });

            var arrRequired = new List<int>();
            var arrEstimated = new List<int>();
            var arrDelivered = new List<int>();

            foreach (var c in mappedWorkloadsData.SkipLast(1))
            {
                arrRequired.Add(c.required);
                arrEstimated.Add(c.estimated);
                arrDelivered.Add(c.delivered);
            }

            var toRet = new
            {
                required = arrRequired,
                estimated = arrEstimated,
                delivered = arrDelivered
            };

            return Ok(toRet);
        }

        [HttpGet("active")]
        public async Task<ActionResult<IEnumerable<WorkloadToShowDTO>>> GetAllWorkloadsActive()
        {
            var workloads = await _context.Workloads.Include(x => x.Project).Where(x => x.Issued == false).ToListAsync();
            var mappedWorkloads = _mapper.Map<IEnumerable<WorkloadToShowDTO>>(workloads);
            return Ok(mappedWorkloads);
        }

        [HttpGet("issued")]
        public async Task<ActionResult<IEnumerable<WorkloadToShowDTO>>> GetAllWorkloadsIssued()
        {
            var workloads = await _context.Workloads.Include(x => x.Project).Where(x => x.Issued == true).ToListAsync();
            var mappedWorkloads = _mapper.Map<IEnumerable<WorkloadToShowDTO>>(workloads);
            return Ok(mappedWorkloads);
        }

        [HttpPost]
        public async Task<ActionResult<Workload>> PostWorkload([FromBody] WorkloadToAddDTO modelDTO)
        {
            if (!ProjectExist(modelDTO.ProjectId)) return NotFound($"Project {modelDTO.ProjectId} does'nt exist.");

            var mapped = _mapper.Map<Workload>(modelDTO);

            await _context.Workloads.AddAsync(mapped);
            await _context.SaveChangesAsync();
            return Ok(modelDTO);
        }

        [HttpPut("{workloadId}")]
        public async Task<ActionResult> EditWorkload(int workloadId, [FromBody] WorkloadToEditDTO modelDTO)
        {
            var workload = await _context.Workloads.FirstOrDefaultAsync(x => x.WorkloadId == workloadId);
            if (workload == null) return NotFound();

            _mapper.Map(modelDTO, workload);
            _context.Entry(workload).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{workloadId}")]
        public async Task<ActionResult> DeleteWorkload(int workloadId)
        {
            var findWorkload = await _context.Workloads.FirstOrDefaultAsync(x => x.WorkloadId == workloadId);
            if (findWorkload == null) return NotFound();

            _context.Workloads.Remove(findWorkload);
            await _context.SaveChangesAsync();
            return Ok();
        }

        private bool ProjectExist(int projectId) => _context.Projects.Any(e => e.ProjectId == projectId);

    }
}