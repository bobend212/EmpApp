using System;

namespace API.DTOs
{
    public class TimesheetRecordToAddDTO
    {
        public int TimesheetRecordId { get; set; }
        public float Time { get; set; }
        public DateTime Date { get; set; }
        public int TimesheetWeekId { get; set; }
        public int WorkTypeId { get; set; }
        public int? ProjectId { get; set; }
    }
}