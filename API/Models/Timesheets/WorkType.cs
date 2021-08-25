using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Models.Timesheets
{
    public class WorkType
    {
        [Key]
        public int WorkTypeId { get; set; }
        public string WorkTypeName { get; set; }
        public int WorkTypeNumber { get; set; }
        public string Type { get; set; }

        public ICollection<TimesheetRecord> TimesheetRecords { get; set; }
    }
}