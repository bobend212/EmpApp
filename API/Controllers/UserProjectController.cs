using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs.ProjectDTOs;
using API.Models.Projects;
using API.Models.Users;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/")]
    public class UserProjectController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserProjectController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpPost("user-project")]
        public async Task<ActionResult<AppUser>> AddUserProject(ProjectUserDTO model)
        {
            //if (!UserExist(model.UserId)) return NotFound("User doesn't exist");
            //if (!ProjectExist(model.ProjectId)) return NotFound("Project doesn't exist");

            var userProject = new AppUserProject
            {
                UserId = model.UserId,
                ProjectId = model.ProjectId
            };

            _context.UserProjects.Add(userProject);
            await _context.SaveChangesAsync();
            return StatusCode(201);
        }

        [HttpDelete("user-project")]
        public async Task<ActionResult<AppUser>> RemoveUserProject(ProjectUserDTO model)
        {
            if (!UserExist(model.UserId)) return NotFound("User doesn't exist");
            if (!ProjectExist(model.ProjectId)) return NotFound("Project doesn't exist");

            var userProject = new AppUserProject
            {
                UserId = model.UserId,
                ProjectId = model.ProjectId
            };

            _context.UserProjects.Remove(userProject);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("{projectId}/users-assigned")]
        [Description("Get list of users assigned to a specified project.")]
        public async Task<ActionResult> GetUsersByProjectId(int projectId)
        {
            //if (!ProjectExistById(projectId)) return NotFound("Project doesn't exist");
            var allUsers = _context.UserProjects.Include(x => x.User).ToList();

            var userQty = allUsers.Select(x => x.User).Where(x => x.Id == 6).Count();

            //var usersAssigned = allUsers.Select(x => x.UserProjects).ToList();
            //var prj = usersAssigned.Select(x => x.Select(x => x.Project)).ToList();

            //var usersDto = _mapper.Map<ICollection<UserForProjectDTO>>(usersAssigned);
            return Ok(allUsers);
        }

        private bool UserExist(int id) => _context.Users.Any(e => e.Id == id);
        private bool ProjectExist(int id) => _context.Projects.Any(e => e.ProjectId == id);
    }
}