using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using API.Models.Timesheets;

namespace API.DTOs
{
    public class AppUserDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }

        //

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }
        public int Experience { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public DateTime? LastUpdate { get; set; }
        public string Gender { get; set; }
        public string Title { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        [Phone]
        public string PhoneNumber { get; set; }

        //

        public ICollection<TimesheetCardToShowDTO> TimesheetCards { get; set; }

    }
}