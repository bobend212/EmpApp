using System;

namespace API.DTOs
{
    public class TimesheetRecordToUpdateDTO
    {
        public float Time { get; set; }
        public DateTime Date { get; set; }
        public int WorkTypeId { get; set; }
        public int? ProjectId { get; set; }
    }
}