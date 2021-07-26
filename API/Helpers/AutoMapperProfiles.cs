using API.DTOs;
using API.Models.Timesheets;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<TimesheetCardToUpdateDTO, TimesheetCard>();
        }

    }
}