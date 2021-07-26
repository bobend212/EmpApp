using System.Linq;
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
    [Route("[controller]")]
    public class TimesheetsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public TimesheetsController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IQueryable<TimesheetCard>>> GetTimesheetCards()
        {
            var timesheetCards = await _context.TimesheetCards.Include(x => x.TimesheetRecords).ToListAsync();
            return Ok(timesheetCards);
        }

        [HttpPost]
        public async Task<ActionResult<TimesheetCard>> PostTimesheetCard(TimesheetCard model)
        {
            await _context.TimesheetCards.AddAsync(model);
            await _context.SaveChangesAsync();
            return Ok(model);
        }

        [HttpDelete("{cardId}")]
        public async Task<ActionResult> DeleteTimesheetCard(int cardId)
        {
            var card = await _context.TimesheetCards.FirstOrDefaultAsync(x => x.TimesheetCardId == cardId);
            if (card == null) return NotFound();
            _context.TimesheetCards.Remove(card);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{cardId}")]
        public async Task<ActionResult> EditMonth(int cardId, [FromBody] TimesheetCardToUpdateDTO modelDTO)
        {
            var card = await _context.TimesheetCards.FindAsync(cardId);
            if (card == null) return NotFound();
            _mapper.Map(modelDTO, card);
            _context.Entry(card).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(card);
        }

    }


}
