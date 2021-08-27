using System;
using System.Collections.Generic;
using API.Helpers;
using API.Models.Projects;

namespace API.Models.Timesheets
{
    public class TimesheetRecord
    {
        public int TimesheetRecordId { get; set; }
        public float Time { get; set; }
        public DateTime Date { get; set; }

        public TimesheetWeek TimesheetWeek { get; set; }

        public int WorkTypeId { get; set; }
        public WorkType WorkType { get; set; }

        public int? ProjectId { get; set; }
        public Project Project { get; set; }

        //
        public string GetDayName()
        {
            return Date.CalculateDayName();
        }
    }
}