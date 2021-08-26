using System.ComponentModel.DataAnnotations;
using API.Models.Users;

namespace API.Models.Projects
{
    public class AppUserProject
    {
        [Key]
        public int UserId { get; set; }
        public AppUser User { get; set; }


        [Key]
        public int ProjectId { get; set; }
        public Project Project { get; set; }
    }
}