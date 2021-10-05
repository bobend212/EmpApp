using System;

namespace API.DTOs.TaskItemsDTOs
{
    public class TaskItemToReturnDTO
    {
        public int TaskItemId { get; set; }
        public string Name { get; set; }
        public DateTime? Create { get; set; }
        public DateTime? Edit { get; set; }
        public int? AuthorId { get; set; }
        public int? EditorId { get; set; }
        public float? EstimatedTime { get; set; }
        public string ItemStage { get; set; }
        public int? ProjectId { get; set; }
        public string ProjectNumber { get; set; }
        public string ProjectName { get; set; }
        public int? UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}