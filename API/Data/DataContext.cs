using API.Models.Timesheets;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<TimesheetCard> TimesheetCards { get; set; }
    }
}