using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs.ProjectDTOs;
using API.Models.Projects;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ProjectsController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            var projects = await _context.Projects.ToListAsync();
            return Ok(projects);
        }

        [HttpPost]
        public async Task<ActionResult<Project>> PostProject([FromBody] ProjectToAddDTO modelDTO)
        {
            var mapped = _mapper.Map<Project>(modelDTO);
            await _context.Projects.AddAsync(mapped);
            await _context.SaveChangesAsync();
            return Ok(modelDTO);
        }
    }
}