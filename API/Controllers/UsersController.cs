using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Models.Users;
using AutoMapper;
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

        [HttpGet]
        public async Task<ActionResult<IQueryable<AppUserDTO>>> GetUsers()
        {
            var users = await _context.Users
            .Include(x => x.TimesheetCards).ThenInclude(x => x.TimesheetWeeks).ThenInclude(x => x.TimesheetRecords)
            .AsSingleQuery()
            .ToListAsync();

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
    }
}