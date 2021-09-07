using System.Linq;
using API.DTOs;
using API.DTOs.ProjectDTOs;
using API.Models.Projects;
using API.Models.Timesheets;
using API.Models.Users;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<TimesheetCardToAddDTO, TimesheetCard>();
            CreateMap<TimesheetCardStatusUpdateDTO, TimesheetCard>();
            CreateMap<TimesheetRecordToUpdateDTO, TimesheetRecord>();

            CreateMap<TimesheetRecord, TimesheetRecordToShowDTO>()
                .ForMember(dto => dto.TimesheetWeekId, c => c.MapFrom(c => c.TimesheetWeek.TimesheetWeekId))
                .ForMember(dto => dto.WorkType, c => c.MapFrom(c => c.WorkType.WorkTypeName))
                .ForMember(dto => dto.ProjectNumber, c => c.MapFrom(c => c.Project.Number));

            // CreateMap<WorkType, TimesheetRecordToShowDTO>()
            //     .ForMember(dto => dto.WorkType, c => c.MapFrom(c => c.WorkTypeName));

            CreateMap<TimesheetRecordToAddDTO, TimesheetRecord>().ReverseMap()
                .ForMember(dto => dto.TimesheetWeekId, c => c.MapFrom(c => c.TimesheetWeek.TimesheetWeekId));

            CreateMap<ProjectToAddDTO, Project>();
            CreateMap<Project, ProjectToShowDTO>()
                .ForMember(dto => dto.UserProject, c => c.MapFrom(c => c.UserProjects.Select(cs => cs.User)));
            CreateMap<ProjectToUpdateDTO, Project>();
            CreateMap<ProjectStageToUpdateDTO, Project>();

            CreateMap<WorkTypeToAdd, WorkType>();

            CreateMap<TimesheetWeek, TimesheetWeeksToShowDTO>()
                .ForMember(dto => dto.TimesheetWeekId, c => c.MapFrom(c => c.TimesheetWeekId));

            CreateMap<AppUserToUpdateDTO, AppUser>();
            CreateMap<RegisterUserDTO, AppUser>();
            CreateMap<AppUser, AppUserDTO>();

            CreateMap<TimesheetCard, TimesheetCardToShowDTO>()
                .ForMember(dto => dto.FirstName, c => c.MapFrom(c => c.AppUser.FirstName))
                .ForMember(dto => dto.LastName, c => c.MapFrom(c => c.AppUser.LastName));

            //
            CreateMap<AppUser, TimesheetCardToShowDTO>()
                .ForMember(dto => dto.FirstName, c => c.MapFrom(c => c.FirstName)).ReverseMap();

            CreateMap<AppUser, UserForProjectDTO>();
            CreateMap<AppUserProject, UserForProjectDTO>();



        }

    }
}