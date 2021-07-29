using System;

namespace API.Models.Timesheets
{
    public class TimesheetWeek
    {
        public int TimesheetWeekId { get; set; }
        public DateTime StartWeek { get; set; }
        public DateTime EndWeek { get; set; }
        public int WeekNo { get; set; }
        public float TotalWeekly { get; set; }
    }
}