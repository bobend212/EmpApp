using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs.ProjectDTOs;
using API.Models.Projects;
using API.Models.Users;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

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
            if (!UserExist(model.UserId)) return NotFound("User doesn't exist");
            if (!ProjectExist(model.ProjectId)) return NotFound("Project doesn't exist");

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

        private bool UserExist(int id) => _context.Users.Any(e => e.Id == id);
        private bool ProjectExist(int id) => _context.Projects.Any(e => e.ProjectId == id);
    }
}