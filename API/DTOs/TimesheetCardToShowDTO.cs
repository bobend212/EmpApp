using System;
using System.Collections.Generic;
using API.Models.Timesheets;

namespace API.DTOs
{
    public class TimesheetCardToShowDTO
    {
        public int TimesheetCardId { get; set; }
        public string CustomName { get; set; }
        public DateTime Date { get; set; }
        public float TotalTime { get; set; }
        public string Status { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public ICollection<TimesheetWeeksToShowDTO> TimesheetWeeks { get; set; }
    }
}