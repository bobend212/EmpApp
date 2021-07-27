using System;

namespace API.DTOs
{
    public class TimesheetRecordToAddDTO
    {
        public float Time { get; set; }
        public DateTime Date { get; set; }
        public int TimesheetCardId { get; set; }
    }
}