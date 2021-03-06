using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs.TaskItemsDTOs;
using API.Models.Projects;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public TasksController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("all")]
        public async Task<ActionResult<ICollection<TaskItem>>> GetTasks()
        {
            var tasks = await _context.TaskItems.Include(x => x.Project).Include(x => x.User).ToListAsync();

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

            var groupedTasks = stages.GroupBy(z => z).Select(v => new TaskItemToReturnHeadDTO
            {
                TaskHead = v.Key,
                Tasks = _mapper.Map<ICollection<TaskItemToReturnDTO>>(tasks).Where(x => x.ItemStage == v.Key).OrderBy(x => x.ProjectId).ToList(),
                Total = tasks.Count()
            });

            return Ok(groupedTasks);
        }

        [HttpGet("all/{projectId}")]
        public async Task<ActionResult<ICollection<TaskItem>>> GetTasksByProject(int projectId)
        {
            var tasks = await _context.TaskItems.Include(x => x.Project).Include(x => x.User).Where(x => x.ProjectId == projectId).ToListAsync();

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

            var groupedTasks = stages.GroupBy(z => z).Select(v => new TaskItemToReturnHeadDTO
            {
                TaskHead = v.Key,
                Tasks = _mapper.Map<ICollection<TaskItemToReturnDTO>>(tasks).Where(x => x.ItemStage == v.Key).OrderBy(x => x.ProjectId).ToList(),
                Total = tasks.Count()
            });

            return Ok(groupedTasks);
        }

        [HttpGet("{taskId}")]
        public async Task<ActionResult<ICollection<TaskItem>>> GetTaskById(int taskId)
        {
            var findTask = await _context.TaskItems.SingleOrDefaultAsync(x => x.TaskItemId == taskId);
            return Ok(findTask);
        }

        [HttpGet("my-tasks")]
        [Description("Return list of tasks assigned to logged user")]
        public async Task<ActionResult<ICollection<TaskItem>>> GetTasksByLoggedUser()
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == username);

            var findTasks = await _context.TaskItems.Where(x => x.UserId == user.Id).Include(x => x.Project).Include(x => x.User).ToListAsync();

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

            var groupedTasks = stages.GroupBy(z => z).Select(v => new TaskItemToReturnHeadDTO
            {
                TaskHead = v.Key,
                Tasks = _mapper.Map<ICollection<TaskItemToReturnDTO>>(findTasks).Where(x => x.ItemStage == v.Key).OrderBy(x => x.ProjectId).ToList(),
                Total = findTasks.Count()
            });

            return Ok(groupedTasks);
        }

        [HttpGet("user/{userId}")]
        [Description("Return list of tasks assigned to specified user")]
        public async Task<ActionResult<ICollection<TaskItem>>> GetTasksByUserId(int userId)
        {
            var findTasks = await _context.TaskItems.Where(x => x.UserId == userId).Include(x => x.Project).Include(x => x.User).ToListAsync();
            var mappedTasks = _mapper.Map<ICollection<TaskItemToReturnDTO>>(findTasks);
            return Ok(mappedTasks);
        }

        // [HttpGet("user/{userId}")]
        // [Description("Return list of tasks assigned to specified user")]
        // public async Task<ActionResult<ICollection<TaskItem>>> GetTasksByUserId(int userId)
        // {
        //     var findTasks = await _context.TaskItems.Where(x => x.UserId == userId).Where(x => x.ItemStage != "Done & Issued").Where(x => x.Project != null).Include(x => x.Project).Include(x => x.User).ToListAsync();
        //     var mappedTasks = _mapper.Map<ICollection<TaskItemToReturnDTO>>(findTasks);

        //     var groupedTasks = findTasks.GroupBy(x => x.Project).Select(z => new
        //     {
        //         Label = z.Key.Number,
        //         Value = z.Key.ProjectId,
        //         Items = _mapper.Map<ICollection<TaskItemCustomToReturnDTO>>(findTasks).Where(x => x.Value == z.Key.ProjectId).ToList()
        //     });

        //     return Ok(groupedTasks);
        // }

        [HttpGet("project/{projectId}")]
        [Description("Return list of tasks by projectId")]
        public async Task<ActionResult<ICollection<TaskItem>>> GetTasksByProjectId(int projectId)
        {
            var findTasks = await _context.TaskItems.Where(x => x.ProjectId == projectId).ToListAsync();
            var mappedTasks = _mapper.Map<ICollection<TaskItemToReturnDTO>>(findTasks);
            return Ok(mappedTasks);
        }

        [HttpDelete("{taskId}")]
        public async Task<ActionResult<TaskItem>> DeleteTaskItem(int taskId)
        {
            var findTask = await _context.TaskItems.SingleOrDefaultAsync(x => x.TaskItemId == taskId); ;
            if (findTask == null) return NotFound();
            _context.TaskItems.Remove(findTask);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<TaskItem>> PostTaskItem([FromBody] TaskItemToAddDTO modelDTO)
        {
            var mapped = _mapper.Map<TaskItem>(modelDTO);

            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == username);

            mapped.AuthorId = user.Id;
            mapped.Create = DateTime.Now;

            await _context.TaskItems.AddAsync(mapped);
            await _context.SaveChangesAsync();
            return Ok(modelDTO);
        }

        [Authorize]
        [HttpPut("edit-task/{taskId}")]
        public async Task<ActionResult> UpdateTaskItem([FromBody] TaskItemToEditDTO modelDTO, int taskId)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == username);

            var findTask = await _context.TaskItems.SingleOrDefaultAsync(x => x.TaskItemId == taskId);
            if (findTask == null) return NotFound();

            findTask.Edit = DateTime.Now;
            findTask.EditorId = user.Id;

            _mapper.Map(modelDTO, findTask);
            _context.Entry(findTask).State = EntityState.Modified;

            if (await _context.SaveChangesAsync() > 0) return NoContent();

            return BadRequest("Failed to update task");
        }

        [Authorize]
        [HttpPut("edit-task-stage/{taskId}")]
        public async Task<ActionResult> UpdateTaskItemStage([FromBody] TaskItemToEditStageDTO modelDTO, int taskId)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == username);

            var findTask = await _context.TaskItems.SingleOrDefaultAsync(x => x.TaskItemId == taskId);
            if (findTask == null) return NotFound();

            findTask.Edit = DateTime.Now;
            findTask.EditorId = user.Id;

            _mapper.Map(modelDTO, findTask);
            _context.Entry(findTask).State = EntityState.Modified;

            if (await _context.SaveChangesAsync() > 0) return NoContent();

            return BadRequest("Failed to update task stage");
        }


    }
}