using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using API.Models.Projects;
using API.Models.Timesheets;
using API.Models.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace API.Data
{
    public static class Seed
    {
        private static List<string> stages = new List<string>
            {
                "To be done",
                "Design done",
                "Design being checked",
                "Design checked",
                "Design being amended",
                "Design checked - ready for issuing",
                "Being issued",
                "Done & Issued"
            };

        public static async Task SeedProjects(DataContext context)
        {
            if (await context.Projects.AnyAsync()) return;

            var projectData = await System.IO.File.ReadAllTextAsync("Data/projects_seed.json");
            var projects = JsonConvert.DeserializeObject<List<Project>>(projectData);

            foreach (var project in projects)
            {

                if (project.Stage == stages[0])
                {
                    project.Status = "Not Started";
                }
                else if (project.Stage == stages[7])
                {
                    project.Status = "Done";
                }
                else
                {
                    project.Status = "In Progress";
                }

                context.Projects.Add(project);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedWorkloads(DataContext context)
        {
            if (await context.Workloads.AnyAsync()) return;

            var workloadsData = await System.IO.File.ReadAllTextAsync("Data/workloads_seed.json");
            var workloads = JsonConvert.DeserializeObject<List<Workload>>(workloadsData);

            foreach (var workload in workloads)
            {
                context.Workloads.Add(workload);
            }

            await context.SaveChangesAsync();
        }

        // public static async Task SeedUsers(DataContext context)
        // {
        //     if (await context.Users.AnyAsync()) return;

        //     var usersData = await System.IO.File.ReadAllTextAsync("Data/users_seed.json");
        //     var users = JsonConvert.DeserializeObject<List<AppUser>>(usersData);

        //     foreach (var user in users)
        //     {
        //         using var hmac = new HMACSHA512();

        //         user.UserName = user.UserName.ToLower();
        //         user.PasswordHash = "pass";

        //         context.Users.Add(user);
        //         await _userManager.CreateAsync(user, "pass");
        //     }

        //     await context.SaveChangesAsync();
        // }

        public static async Task SeedUsers(UserManager<AppUser> userManager,
            RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/users_seed.json");
            var users = JsonConvert.DeserializeObject<List<AppUser>>(userData);
            if (users == null) return;

            var roles = new List<AppRole>
            {
                new AppRole{Name = "Admin"},
                new AppRole{Name = "User"},
                new AppRole{Name = "Moderator"},
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "pass");
                await userManager.AddToRoleAsync(user, "User");
            }

            var admin = new AppUser
            {
                UserName = "admin"
            };

            await userManager.CreateAsync(admin, "pass");
            await userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator", "User" });
        }

        public static async Task SeedTasks(DataContext context)
        {
            if (await context.TaskItems.AnyAsync()) return;

            var taskItemsData = await System.IO.File.ReadAllTextAsync("Data/tasks_seed.json");
            var tasks = JsonConvert.DeserializeObject<List<TaskItem>>(taskItemsData);

            foreach (var task in tasks)
            {
                context.TaskItems.Add(task);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedUserProject(DataContext context)
        {
            if (await context.UserProjects.AnyAsync()) return;

            var userProjectData = await System.IO.File.ReadAllTextAsync("Data/user-project_seed.json");
            var userProjects = JsonConvert.DeserializeObject<List<AppUserProject>>(userProjectData);

            foreach (var userProject in userProjects)
            {
                context.UserProjects.Add(userProject);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedEstimations(DataContext context)
        {
            if (await context.Estimations.AnyAsync()) return;

            var estimationsData = await System.IO.File.ReadAllTextAsync("Data/estimations_seed.json");
            var estimations = JsonConvert.DeserializeObject<List<Estimation>>(estimationsData);

            foreach (var estimation in estimations)
            {
                context.Estimations.Add(estimation);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedWorkTypes(DataContext context)
        {
            if (await context.WorkTypes.AnyAsync()) return;

            var workTypesData = await System.IO.File.ReadAllTextAsync("Data/worktypes_seed.json");
            var workTypes = JsonConvert.DeserializeObject<List<WorkType>>(workTypesData);

            foreach (var workType in workTypes)
            {
                context.WorkTypes.Add(workType);
            }

            await context.SaveChangesAsync();
        }
    }
}