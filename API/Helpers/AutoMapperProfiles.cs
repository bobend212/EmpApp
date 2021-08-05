using System.Linq;
using API.DTOs;
using API.Models.Timesheets;
using API.Models.Users;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<TimesheetCardToAddOrUpdateDTO, TimesheetCard>();
            CreateMap<TimesheetCardStatusUpdateDTO, TimesheetCard>();
            CreateMap<TimesheetRecordToUpdateDTO, TimesheetRecord>();

            CreateMap<TimesheetRecord, TimesheetRecordToShowDTO>()
                .ForMember(dto => dto.TimesheetWeekId, c => c.MapFrom(c => c.TimesheetWeek.TimesheetWeekId));

            CreateMap<TimesheetRecordToAddDTO, TimesheetRecord>();

            CreateMap<TimesheetWeek, TimesheetWeeksToShowDTO>()
                .ForMember(dto => dto.TimesheetWeekId, c => c.MapFrom(c => c.TimesheetWeekId));

            CreateMap<AppUserToUpdateDTO, AppUser>();
            CreateMap<AppUser, AppUserDTO>();

            CreateMap<TimesheetCard, TimesheetCardToShowDTO>()
                .ForMember(dto => dto.FirstName, c => c.MapFrom(c => c.AppUser.FirstName))
                .ForMember(dto => dto.LastName, c => c.MapFrom(c => c.AppUser.LastName));

            //
            CreateMap<AppUser, TimesheetCardToShowDTO>()
                .ForMember(dto => dto.FirstName, c => c.MapFrom(c => c.FirstName)).ReverseMap();



        }

    }
}