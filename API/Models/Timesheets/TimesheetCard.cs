using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using API.Models.Users;

namespace API.Models.Timesheets
{
    public class TimesheetCard
    {
        [Key]
        public int TimesheetCardId { get; set; }
        public DateTime Date { get; set; }
        public float TotalTime { get; set; }
        public string Status { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;

        public ICollection<TimesheetWeek> TimesheetWeeks { get; set; }

        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }

    }
}