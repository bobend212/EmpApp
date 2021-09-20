using System.Collections.Generic;
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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Workload>>> GetAllWorkloads()
        {
            var workloads = await _context.Workloads.Include(x => x.Project).ToListAsync();
            //var mappedProjects = _mapper.Map<IEnumerable<ProjectToShowDTO>>(workloads);
            return Ok(workloads);
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