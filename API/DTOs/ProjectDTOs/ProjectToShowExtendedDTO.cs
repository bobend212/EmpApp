using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.ProjectDTOs
{
    public class ProjectToShowExtendedDTO
    {
        public ProjectToShowDTO Project { get; set; }
        public bool? HasWorkload { get; set; }
        public bool? HasEstimating { get; set; }
    }
}