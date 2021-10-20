using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs.EstimatingDTOs;
using API.Models.Projects;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EstimatingController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public EstimatingController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Estimation>>> GetEstimations()
        {
            var estimations = await _context.Estimations.Include(x => x.Project).Include(x => x.Author).Include(x => x.Editor).ToListAsync();
            var mappedEstimations = _mapper.Map<IEnumerable<EstimatingToShowDTO>>(estimations);
            return Ok(mappedEstimations);
        }

        [HttpGet("{estimationId}")]
        public async Task<ActionResult<Estimation>> GetEstimationById(int estimationId)
        {
            var findEstimation = await _context.Estimations.Include(x => x.Project).Include(x => x.Author).Include(x => x.Editor).SingleOrDefaultAsync(x => x.EstimationId == estimationId);
            if (findEstimation == null) return NotFound();
            var mappedEstimation = _mapper.Map<EstimatingToShowDTO>(findEstimation);
            return Ok(mappedEstimation);
        }

        [HttpGet("project/{projectId}")]
        public async Task<ActionResult<Estimation>> GetEstimationByProjectId(int projectId)
        {
            var findEstimation = await _context.Estimations.Include(x => x.Project).Include(x => x.Author).Include(x => x.Editor).SingleOrDefaultAsync(x => x.ProjectId == projectId);
            if (findEstimation == null) return NotFound();
            var mappedEstimation = _mapper.Map<EstimatingToShowDTO>(findEstimation);
            return Ok(mappedEstimation);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Estimation>> PostEstimation([FromBody] EstimatingToAddOrEditDTO modelDTO)
        {
            var mappedEstimation = _mapper.Map<Estimation>(modelDTO);

            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == username);

            mappedEstimation.AuthorId = user.Id;

            await _context.Estimations.AddAsync(mappedEstimation);
            await _context.SaveChangesAsync();
            return Ok(modelDTO);
        }

        [Authorize]
        [HttpPut("{estimationId}")]
        public async Task<ActionResult> UpdateEstimation([FromBody] EstimatingToAddOrEditDTO modelDTO, int estimationId)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == username);

            var findEstimation = await _context.Estimations.SingleOrDefaultAsync(x => x.EstimationId == estimationId);
            if (findEstimation == null) return NotFound();

            findEstimation.Edit = DateTime.Now;
            findEstimation.EditorId = user.Id;

            _mapper.Map(modelDTO, findEstimation);
            _context.Entry(findEstimation).State = EntityState.Modified;

            if (await _context.SaveChangesAsync() > 0) return NoContent();

            return BadRequest("Failed to update estimation.");
        }

        [HttpDelete("{estimationId}")]
        public async Task<ActionResult<Estimation>> DeleteEstimation(int estimationId)
        {
            var findEstimation = await _context.Estimations.SingleOrDefaultAsync(x => x.EstimationId == estimationId);
            if (findEstimation == null) return NotFound();
            _context.Estimations.Remove(findEstimation);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}