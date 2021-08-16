using System;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {

        private readonly DataContext _context;
        public LogUserActivity(DataContext context)
        {
            _context = context;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            if (!resultContext.HttpContext.User.Identity.IsAuthenticated) return;

            var username = resultContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = await _context.Users
                .Include(x => x.TimesheetCards).ThenInclude(x => x.TimesheetWeeks).ThenInclude(x => x.TimesheetRecords)
                .AsSingleQuery()
                .SingleOrDefaultAsync(x => x.UserName == username);

            user.LastActive = DateTime.Now;
            await _context.SaveChangesAsync();
        }
    }
}