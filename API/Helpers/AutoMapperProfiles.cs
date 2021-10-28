using System.Collections.Generic;
using System.Linq;
using API.DTOs;
using API.DTOs.EstimatingDTOs;
using API.DTOs.ProjectDTOs;
using API.DTOs.TaskItemsDTOs;
using API.DTOs.WorkloadDTOs;
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

            CreateMap<AppUser, UserForProjectDTO>()
                .ForMember(dto => dto.ProjectsCount, c => c.MapFrom(c => c.UserProjects.Select(x => x.User).Count()));
            CreateMap<AppUserProject, UserForProjectDTO>();


            //TASKS//
            CreateMap<TaskItemToAddDTO, TaskItem>();
            CreateMap<TaskItemToEditDTO, TaskItem>();
            CreateMap<TaskItemToEditStageDTO, TaskItem>();
            CreateMap<TaskItem, TaskItemToReturnDTO>()
                .ForMember(dto => dto.FirstName, c => c.MapFrom(c => c.User.FirstName))
                .ForMember(dto => dto.LastName, c => c.MapFrom(c => c.User.LastName));

            // CreateMap<TaskItem, TaskItemCustomToReturnDTO>()
            //     .ForMember(dto => dto.Label, c => c.MapFrom(c => c.Name + " - " + c.ItemStage))
            //     .ForMember(dto => dto.Value, c => c.MapFrom(c => c.Project.ProjectId));

            CreateMap<TaskItemToReturnHeadDTO, TaskItem>().ReverseMap()
                .ForMember(dto => dto.TaskHead, c => c.MapFrom(c => c.ItemStage));


            //WORKLOAD//
            CreateMap<WorkloadToAddDTO, Workload>();
            CreateMap<WorkloadToEditDTO, Workload>();
            CreateMap<Workload, WorkloadToShowDTO>()
                .ForMember(dto => dto.ProjectId, c => c.MapFrom(c => c.Project.ProjectId));


            //ESTIMATING
            CreateMap<EstimatingToAddOrEditDTO, Estimation>();
            CreateMap<Estimation, EstimatingToShowDTO>()
                .ForMember(dto => dto.ProjectFullName, c => c.MapFrom(c => c.Project.Number + " " + c.Project.Name))
                .ForMember(dto => dto.AuthorFullName, c => c.MapFrom(c => c.Author.FirstName + " " + c.Author.LastName))
                .ForMember(dto => dto.EditorFullName, c => c.MapFrom(c => c.Editor.FirstName + " " + c.Editor.LastName));

        }
    }
}