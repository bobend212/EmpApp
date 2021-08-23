using System;

namespace API.DTOs
{
    public class TimesheetCardToAddDTO
    {
        public DateTime Date { get; set; }
        public string Status { get; set; }
        public int AppUserId { get; set; }
    }
}