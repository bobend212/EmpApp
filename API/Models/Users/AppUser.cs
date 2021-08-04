using System;
using System.Collections.Generic;
using API.Helpers;
using API.Models.Timesheets;

namespace API.Models.Users
{
    public class AppUser
    {
        public int AppUserId { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        //

        public DateTime DateOfBirth { get; set; }
        public DateTime HireDate { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public string Gender { get; set; }
        public string Title { get; set; }

        //

        public ICollection<TimesheetCard> TimesheetCards { get; set; }

        //

        public int GetExperience()
        {
            return HireDate.CalculateExperience();
        }

    }
}