using System;

namespace API.Models.Timesheets
{
    public class TimesheetCard
    {
        public int TimesheetCardId { get; set; }
        public string CustomName { get; set; }
        public DateTime Date { get; set; }
    }
}