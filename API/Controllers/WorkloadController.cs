using System.Collections.Generic;
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
            var mappedProjects = _mapper.Map<IEnumerable<WorkloadToShowDTO>>(workloads);
            return Ok(mappedProjects);
        }

        [HttpGet("active")]
        public async Task<ActionResult<IEnumerable<WorkloadToShowDTO>>> GetAllWorkloadsActive()
        {
            var workloads = await _context.Workloads.Include(x => x.Project).Where(x => x.Issued == false).ToListAsync();
            var mappedProjects = _mapper.Map<IEnumerable<WorkloadToShowDTO>>(workloads);
            return Ok(mappedProjects);
        }

        [HttpGet("issued")]
        public async Task<ActionResult<IEnumerable<WorkloadToShowDTO>>> GetAllWorkloadsIssued()
        {
            var workloads = await _context.Workloads.Include(x => x.Project).Where(x => x.Issued == true).ToListAsync();
            var mappedProjects = _mapper.Map<IEnumerable<WorkloadToShowDTO>>(workloads);
            return Ok(mappedProjects);
        }

        [HttpPost]
        public async Task<ActionResult<Workload>> PostWorkload([FromBody] WorkloadToAddDTO modelDTO)
        {
            //if (ProjectExist(modelDTO.Number)) return NotFound($"Project {modelDTO.Number} already exist.");

            var mapped = _mapper.Map<Workload>(modelDTO);

            await _context.Workloads.AddAsync(mapped);
            await _context.SaveChangesAsync();
            return Ok(modelDTO);
        }
    }
}