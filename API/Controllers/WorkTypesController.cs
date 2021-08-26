using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Models.Timesheets;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkTypesController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public WorkTypesController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkType>>> GetWorkTypes()
        {
            var workTypes = await _context.WorkTypes.ToListAsync();
            return Ok(workTypes);
        }

        [HttpPost]
        public async Task<ActionResult<WorkType>> PostWorkType([FromBody] WorkTypeToAdd modelDTO)
        {
            var mapped = _mapper.Map<WorkType>(modelDTO);
            await _context.WorkTypes.AddAsync(mapped);
            await _context.SaveChangesAsync();
            return Ok(mapped);
        }
    }
}