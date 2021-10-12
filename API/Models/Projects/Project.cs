using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using API.Models.Timesheets;

namespace API.Models.Projects
{
    public class Project
    {
        [Key]
        public int ProjectId { get; set; }
        public string Number { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public string Stage { get; set; }
        public string Plot { get; set; }
        public string Block { get; set; }
        public string Site { get; set; }
        public DateTime Create { get; set; } = DateTime.Now;
        public DateTime? Update { get; set; }
        public string Comments { get; set; }

        public ICollection<AppUserProject> UserProjects { get; set; }
        public ICollection<TimesheetRecord> TimesheetRecords { get; set; }
        public ICollection<TaskItem> TaskItems { get; set; }
        public Workload Workload { get; set; }
        public Estimation Estimation { get; set; }

    }
}