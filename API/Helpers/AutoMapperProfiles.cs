using System.Linq;
using API.DTOs;
using API.Models.Timesheets;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<TimesheetCardToAddOrUpdateDTO, TimesheetCard>();
            CreateMap<TimesheetRecordToUpdateDTO, TimesheetRecord>();

            CreateMap<TimesheetRecord, TimesheetRecordToShowDTO>()
                .ForMember(dto => dto.TimesheetCardId, c => c.MapFrom(c => c.TimesheetWeek.TimesheetWeekId));

            CreateMap<TimesheetRecordToAddDTO, TimesheetRecord>();

        }

    }
}