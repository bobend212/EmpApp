using System;

namespace API.DTOs
{
    public class TimesheetRecordToAddDTO
    {
        public float Time { get; set; }
        public DateTime Date { get; set; }
        public int TimesheetWeekId { get; set; }
    }
}