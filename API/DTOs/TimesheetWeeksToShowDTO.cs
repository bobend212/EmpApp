using System;

namespace API.DTOs
{
    public class TimesheetWeeksToShowDTO
    {
        public int TimesheetWeekId { get; set; }
        public DateTime StartWeek { get; set; }
        public DateTime EndWeek { get; set; }
        public int WeekNo { get; set; }
        public float TotalWeekly { get; set; }
    }
}