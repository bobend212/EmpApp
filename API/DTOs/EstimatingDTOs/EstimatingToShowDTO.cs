using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.EstimatingDTOs
{
    public class EstimatingToShowDTO
    {
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
        public DateTime? Create { get; set; } = DateTime.Now;
        public DateTime? Edit { get; set; }
        public int? AuthorId { get; set; }
        public int? EditorId { get; set; }
        public string ProjectFullName { get; set; }
        public string AuthorFullName { get; set; }
        public string EditorFullName { get; set; }
    }
}