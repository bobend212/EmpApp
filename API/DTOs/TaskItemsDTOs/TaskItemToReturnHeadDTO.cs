using System.Collections.Generic;

namespace API.DTOs.TaskItemsDTOs
{
    public class TaskItemToReturnHeadDTO
    {
        public string TaskHead { get; set; }
        public ICollection<TaskItemToReturnDTO> Tasks { get; set; }
        public int Total { get; set; }
    }
}