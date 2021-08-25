using API.Models.Timesheets;
using API.Models.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, int,
        IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>,
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<TimesheetCard> TimesheetCards { get; set; }
        public DbSet<TimesheetWeek> TimesheetWeeks { get; set; }
        public DbSet<TimesheetRecord> TimesheetRecords { get; set; }

        //

        public DbSet<WorkType> WorkTypes { get; set; }

        //

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AppUser>()
                .HasMany(c => c.TimesheetCards)
                .WithOne(e => e.AppUser)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TimesheetCard>()
                .HasMany(c => c.TimesheetWeeks)
                .WithOne(e => e.TimesheetCard)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TimesheetWeek>()
                .HasMany(c => c.TimesheetRecords)
                .WithOne(e => e.TimesheetWeek)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            modelBuilder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();
            //

        }
    }
}