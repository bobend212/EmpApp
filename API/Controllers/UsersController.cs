using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Helpers;
using API.Models.Users;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UsersController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUserDTO>>> GetUsers([FromQuery] UserParams userParams)
        {
            var query = _context.Users.Include(x => x.TimesheetCards).ThenInclude(x => x.TimesheetWeeks).ThenInclude(x => x.TimesheetRecords)
                .ProjectTo<AppUserDTO>(_mapper.ConfigurationProvider)
                .AsNoTracking();

            var users = await PagedList<AppUserDTO>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);

            // var users = await _context.Users
            // .Include(x => x.TimesheetCards).ThenInclude(x => x.TimesheetWeeks).ThenInclude(x => x.TimesheetRecords)
            // .AsSingleQuery()
            // .ToListAsync();

            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            var mappedUsers = _mapper.Map<IEnumerable<AppUserDTO>>(users);
            return Ok(mappedUsers);
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<AppUserDTO>> GetUserById(int userId)
        {
            var user = await _context.Users
            .Include(x => x.TimesheetCards).ThenInclude(x => x.TimesheetWeeks).ThenInclude(x => x.TimesheetRecords)
            .AsSingleQuery()
            .SingleOrDefaultAsync(x => x.AppUserId == userId);

            var mappedUser = _mapper.Map<AppUserDTO>(user);
            return Ok(mappedUser);
        }

        [HttpGet("name/{username}")]
        public async Task<ActionResult<AppUserDTO>> GetUserByUsername(string username)
        {
            var user = await _context.Users
                .Include(x => x.TimesheetCards).ThenInclude(x => x.TimesheetWeeks).ThenInclude(x => x.TimesheetRecords)
                .AsSingleQuery()
                .SingleOrDefaultAsync(x => x.UserName == username);

            var mappedUser = _mapper.Map<AppUserDTO>(user);
            return Ok(mappedUser);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(AppUserToUpdateDTO modelDTO)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == username);

            _mapper.Map(modelDTO, user);
            _context.Entry(user).State = EntityState.Modified;

            if (await _context.SaveChangesAsync() > 0) return NoContent();

            return BadRequest("failed to update");
        }
    }
}