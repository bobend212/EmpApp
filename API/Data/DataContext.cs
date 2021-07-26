using API.Models.Timesheets;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<TimesheetCard> TimesheetCards { get; set; }
        public DbSet<TimesheetRecord> TimesheetRecords { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TimesheetCard>()
                .HasMany(c => c.TimesheetRecords)
                .WithOne(e => e.TimesheetCard)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}