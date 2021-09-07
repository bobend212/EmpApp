using System.Collections.Generic;

namespace API.DTOs.ProjectDTOs
{
    public class UserForProjectDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int ProjectsQty { get; set; }

    }
}