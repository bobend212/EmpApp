namespace API.DTOs.TaskItemsDTOs
{
    public class TaskItemToEditDTO
    {
        public string Name { get; set; }
        public float? EstimatedTime { get; set; }
        public string ItemStage { get; set; }
        public int? ProjectId { get; set; }
        public int? UserId { get; set; }
    }
}