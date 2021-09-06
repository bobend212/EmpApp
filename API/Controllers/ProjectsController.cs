using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.DTOs.ProjectDTOs;
using API.Helpers;
using API.Models.Projects;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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
        public async Task<ActionResult<IEnumerable<ProjectToShowDTO>>> GetProjects()
        {
            var projects = await _context.Projects.ToListAsync();
            var mappedProjects = _mapper.Map<IEnumerable<ProjectToShowDTO>>(projects);
            return Ok(mappedProjects);
        }

        [HttpPost]
        public async Task<ActionResult<Project>> PostProject([FromBody] ProjectToAddDTO modelDTO)
        {
            var mapped = _mapper.Map<Project>(modelDTO);
            await _context.Projects.AddAsync(mapped);
            await _context.SaveChangesAsync();
            return Ok(modelDTO);
        }

        [HttpGet("{projectId}")]
        public async Task<ActionResult<ProjectToShowDTO>> GetProjectById(int projectId)
        {
            var project = await _context.Projects.Include(x => x.UserProjects).ThenInclude(z => z.User).SingleOrDefaultAsync(x => x.ProjectId == projectId);
            var mappedProject = _mapper.Map<ProjectToShowDTO>(project);
            return Ok(mappedProject);
        }

        [HttpDelete("{projectId}")]
        public async Task<ActionResult> DeleteProject(int projectId)
        {
            var findProject = await _context.Projects.FirstOrDefaultAsync(x => x.ProjectId == projectId);
            if (findProject == null) return NotFound();

            _context.Projects.Remove(findProject);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{projectId}")]
        public async Task<ActionResult> EditProject(int projectId, [FromBody] ProjectToUpdateDTO modelDTO)
        {
            var project = await _context.Projects.FirstOrDefaultAsync(x => x.ProjectId == projectId);
            if (project == null) return NotFound();

            project.Update = DateTime.Now;

            _mapper.Map(modelDTO, project);
            _context.Entry(project).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("stage/{projectId}")]
        public async Task<ActionResult> EditProjectStage(int projectId, [FromBody] ProjectStageToUpdateDTO modelDTO)
        {
            var stages = new List<string>
            {
                "To be done",
                "Design done",
                "Design being checked",
                "Design checked",
                "Design being amended",
                "Design checked - ready for issuing",
                "Being issued",
                "Done & Issued"
            };

            var project = await _context.Projects.FirstOrDefaultAsync(x => x.ProjectId == projectId);
            if (project == null) return NotFound();

            if (modelDTO.Stage == stages[0])
            {
                project.Status = "Not Started";
            }
            else if (modelDTO.Stage == stages[7])
            {
                project.Status = "Done";
            }
            else
            {
                project.Status = "In Progress";
            }

            project.Update = DateTime.Now;

            _mapper.Map(modelDTO, project);
            _context.Entry(project).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IQueryable<Project>>> GetProjectsByUserId(int userId)
        {
            var projects = await _context.UserProjects
            .Where(x => x.UserId == userId)
            .Select(x => x.Project)
            .ToListAsync();

            return Ok(_mapper.Map<IEnumerable<ProjectToShowDTO>>(projects));
        }
    }
}