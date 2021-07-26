using System;
using System.Collections.Generic;

namespace API.Models.Timesheets
{
    public class TimesheetRecord
    {
        public int TimesheetRecordId { get; set; }
        public float Time { get; set; }
        public DateTime Date { get; set; }

        public TimesheetCard TimesheetCard { get; set; }
    }
}