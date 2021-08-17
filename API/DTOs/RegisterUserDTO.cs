using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterUserDTO
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime HireDate { get; set; }
        public string Gender { get; set; }
        public string Title { get; set; }
    }
}