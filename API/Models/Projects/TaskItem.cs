using System;
using System.ComponentModel.DataAnnotations;
using API.Models.Users;

namespace API.Models.Projects
{
    public class TaskItem
    {
        [Key]
        public int TaskItemId { get; set; }
        public string Name { get; set; }
        public DateTime? Create { get; set; }
        public DateTime? Edit { get; set; }
        public int? AuthorId { get; set; }
        public int? EditorId { get; set; }
        public float? EstimatedTime { get; set; }
        public string ItemStage { get; set; }

        public int? ProjectId { get; set; }
        public Project Project { get; set; }

        public int? UserId { get; set; }
        public AppUser User { get; set; }
    }
}