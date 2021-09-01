using System;

namespace API.DTOs.ProjectDTOs
{
    public class ProjectToShowDTO
    {
        public int ProjectId { get; set; }
        public string Number { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public string Stage { get; set; }
        public string Plot { get; set; }
        public string Block { get; set; }
        public string Site { get; set; }
        public DateTime Create { get; set; }
        public DateTime Update { get; set; }
        public string Comments { get; set; }
    }
}