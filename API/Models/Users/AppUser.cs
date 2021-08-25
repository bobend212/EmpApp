using System;
using System.Collections.Generic;
using API.Helpers;
using API.Models.Timesheets;
using Microsoft.AspNetCore.Identity;

namespace API.Models.Users
{
    public class AppUser : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime HireDate { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public DateTime? LastUpdate { get; set; }
        public string Gender { get; set; }
        public string Title { get; set; }

        //

        public ICollection<TimesheetCard> TimesheetCards { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
        //

        public int GetExperience()
        {
            return HireDate.CalculateExperience();
        }

    }
}