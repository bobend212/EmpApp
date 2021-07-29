using System;

namespace API.DTOs
{
    public class TimesheetCardToAddOrUpdateDTO
    {
        public string CustomName { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; }
    }
}