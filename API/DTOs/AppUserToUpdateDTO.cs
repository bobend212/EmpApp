using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class AppUserToUpdateDTO
    {
        [EmailAddress]
        public string Email { get; set; }
        [Phone]
        public string PhoneNumber { get; set; }
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }


    }
}