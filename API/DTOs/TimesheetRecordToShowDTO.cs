using System;

namespace API.DTOs
{
    public class TimesheetRecordToShowDTO
    {
        public int TimesheetRecordId { get; set; }
        public float Time { get; set; }
        public DateTime Date { get; set; }
        public int TimesheetWeekId { get; set; }
    }
}