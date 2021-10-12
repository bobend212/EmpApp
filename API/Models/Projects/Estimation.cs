using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.Projects
{
    public class Estimation
    {
        [Key]
        public int EstimationId { get; set; }

        public float Panels { get; set; }
        public float Floor { get; set; }
        public float Roof { get; set; }
        public float Steel { get; set; }
        public float DouglasFirs { get; set; }
        public float GPFrames { get; set; }
        public float Checking { get; set; }
        public float Issuing { get; set; }
        public float Slab { get; set; }
        public float Sections { get; set; }
        public float Other { get; set; }
        public float Total { get; set; }
        public DateTime? IssueDate { get; set; }
        public DateTime? Create { get; set; }
        public DateTime? Edit { get; set; }
        public int? AuthorId { get; set; }
        public int? EditorId { get; set; }


        public int ProjectId { get; set; }
        public Project Project { get; set; }
    }
}