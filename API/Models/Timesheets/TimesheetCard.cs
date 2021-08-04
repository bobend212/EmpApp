using System;
using System.Collections.Generic;
using API.Models.Users;

namespace API.Models.Timesheets
{
    public class TimesheetCard
    {
        public int TimesheetCardId { get; set; }
        public string CustomName { get; set; }
        public DateTime Date { get; set; }
        public float TotalTime { get; set; }
        public string Status { get; set; }

        public ICollection<TimesheetWeek> TimesheetWeeks { get; set; }

        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}