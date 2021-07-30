using API.Models.Timesheets;
using API.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<TimesheetCard> TimesheetCards { get; set; }
        public DbSet<TimesheetWeek> TimesheetWeeks { get; set; }
        public DbSet<TimesheetRecord> TimesheetRecords { get; set; }

        //

        public DbSet<AppUser> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TimesheetCard>()
                .HasMany(c => c.TimesheetWeeks)
                .WithOne(e => e.TimesheetCard)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TimesheetWeek>()
                .HasMany(c => c.TimesheetRecords)
                .WithOne(e => e.TimesheetWeek)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}