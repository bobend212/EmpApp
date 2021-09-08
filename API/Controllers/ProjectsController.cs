using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.DTOs.ProjectDTOs;
using API.Helpers;
using API.Models.Projects;
using API.Models.Users;
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
            var projects = await _context.Projects.Include(x => x.UserProjects).ThenInclude(z => z.User).ToListAsync();
            var mappedProjects = _mapper.Map<IEnumerable<ProjectToShowDTO>>(projects);
            return Ok(mappedProjects);
        }

        [HttpPost]
        public async Task<ActionResult<Project>> PostProject([FromBody] ProjectToAddDTO modelDTO)
        {
            if (ProjectExist(modelDTO.Number)) return NotFound($"Project {modelDTO.Number} already exist.");

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
            if (ProjectExist(modelDTO.Number)) return NotFound($"Project {modelDTO.Number} already exist.");

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

        [HttpGet("{projectId}/users-assigned")]
        [Description("Get list of users assigned to a specified project.")]
        public async Task<ActionResult> GetProjectUsers(int projectId)
        {
            if (!ProjectExistById(projectId)) return NotFound("Project doesn't exist");
            var project = await _context.Projects.Include(x => x.UserProjects).ThenInclude(z => z.User).SingleOrDefaultAsync(x => x.ProjectId == projectId);
            var users = project.UserProjects.Select(x => x.User).ToList();

            var usersDto = _mapper.Map<ICollection<UserForProjectDTO>>(users);
            return Ok(usersDto);
        }


        [HttpGet("{projectId}/users-not-assigned")]
        [Description("Get list of users NOT assigned to a specified project.")]
        public async Task<ActionResult> GetProjectUsersNotAssigned(int projectId)
        {
            if (!ProjectExistById(projectId)) return NotFound("Project doesn't exist");

            var project = await _context.Projects.Include(x => x.UserProjects).ThenInclude(z => z.User).SingleOrDefaultAsync(x => x.ProjectId == projectId);

            var users1 = project.UserProjects.Select(x => x.User).ToList();
            var users2 = await _context.Users
            .Include(x => x.TimesheetCards).ThenInclude(x => x.TimesheetWeeks).ThenInclude(x => x.TimesheetRecords)
            .AsSingleQuery()
            .ToListAsync();

            var result = users2.Where(p => !users1.Any(p2 => p2.Id == p.Id));

            var usersDto = _mapper.Map<ICollection<UserForProjectDTO>>(result);

            return Ok(usersDto);
        }

        private bool ProjectExist(string number) => _context.Projects.Any(e => e.Number == number);
        private bool ProjectExistById(int id) => _context.Projects.Any(e => e.ProjectId == id);
    }
}