using System;

namespace API.DTOs
{
    public class TimesheetRecordToShowDTO
    {
        public int TimesheetRecordId { get; set; }
        public float Time { get; set; }
        public DateTime Date { get; set; }
        public int TimesheetWeekId { get; set; }
        public string WorkType { get; set; }
        public string ProjectNumber { get; set; }
        public string DayName { get; set; }
    }
}