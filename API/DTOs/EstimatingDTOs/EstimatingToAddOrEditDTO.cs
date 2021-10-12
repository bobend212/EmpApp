using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.EstimatingDTOs
{
    public class EstimatingToAddOrEditDTO
    {
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

        public int ProjectId { get; set; }
    }
}