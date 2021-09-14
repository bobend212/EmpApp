﻿// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.9");

            modelBuilder.Entity("API.Models.Projects.AppUserProject", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ProjectId")
                        .HasColumnType("INTEGER");

                    b.HasKey("UserId", "ProjectId");

                    b.HasIndex("ProjectId");

                    b.ToTable("UserProjects");
                });

            modelBuilder.Entity("API.Models.Projects.Project", b =>
                {
                    b.Property<int>("ProjectId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Block")
                        .HasColumnType("TEXT");

                    b.Property<string>("Comments")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Create")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Number")
                        .HasColumnType("TEXT");

                    b.Property<string>("Plot")
                        .HasColumnType("TEXT");

                    b.Property<string>("Site")
                        .HasColumnType("TEXT");

                    b.Property<string>("Stage")
                        .HasColumnType("TEXT");

                    b.Property<string>("Status")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("Update")
                        .HasColumnType("TEXT");

                    b.HasKey("ProjectId");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("API.Models.Projects.TaskItem", b =>
                {
                    b.Property<int>("TaskItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("AuthorId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("Create")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("Edit")
                        .HasColumnType("TEXT");

                    b.Property<int?>("EditorId")
                        .HasColumnType("INTEGER");

                    b.Property<float?>("EstimatedTime")
                        .HasColumnType("REAL");

                    b.Property<string>("ItemStage")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<int?>("ProjectId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("TaskItemId");

                    b.HasIndex("ProjectId");

                    b.HasIndex("UserId");

                    b.ToTable("TaskItems");
                });

            modelBuilder.Entity("API.Models.Timesheets.TimesheetCard", b =>
                {
                    b.Property<int>("TimesheetCardId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AppUserId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Created")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Date")
                        .HasColumnType("TEXT");

                    b.Property<string>("Status")
                        .HasColumnType("TEXT");

                    b.Property<float>("TotalTime")
                        .HasColumnType("REAL");

                    b.HasKey("TimesheetCardId");

                    b.HasIndex("AppUserId");

                    b.ToTable("TimesheetCards");
                });

            modelBuilder.Entity("API.Models.Timesheets.TimesheetRecord", b =>
                {
                    b.Property<int>("TimesheetRecordId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Date")
                        .HasColumnType("TEXT");

                    b.Property<int?>("ProjectId")
                        .HasColumnType("INTEGER");

                    b.Property<float>("Time")
                        .HasColumnType("REAL");

                    b.Property<int?>("TimesheetWeekId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("WorkTypeId")
                        .HasColumnType("INTEGER");

                    b.HasKey("TimesheetRecordId");

                    b.HasIndex("ProjectId");

                    b.HasIndex("TimesheetWeekId");

                    b.HasIndex("WorkTypeId");

                    b.ToTable("TimesheetRecords");
                });

            modelBuilder.Entity("API.Models.Timesheets.TimesheetWeek", b =>
                {
                    b.Property<int>("TimesheetWeekId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("EndWeek")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("StartWeek")
                        .HasColumnType("TEXT");

                    b.Property<int?>("TimesheetCardId")
                        .HasColumnType("INTEGER");

                    b.Property<float>("TotalWeekly")
                        .HasColumnType("REAL");

                    b.Property<int>("WeekNo")
                        .HasColumnType("INTEGER");

                    b.HasKey("TimesheetWeekId");

                    b.HasIndex("TimesheetCardId");

                    b.ToTable("TimesheetWeeks");
                });

            modelBuilder.Entity("API.Models.Timesheets.WorkType", b =>
                {
                    b.Property<int>("WorkTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Type")
                        .HasColumnType("TEXT");

                    b.Property<string>("WorkTypeName")
                        .HasColumnType("TEXT");

                    b.Property<int>("WorkTypeNumber")
                        .HasColumnType("INTEGER");

                    b.HasKey("WorkTypeId");

                    b.ToTable("WorkTypes");
                });

            modelBuilder.Entity("API.Models.Users.AppRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("API.Models.Users.AppUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Created")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("FirstName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Gender")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("HireDate")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("LastActive")
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("LastUpdate")
                        .HasColumnType("TEXT");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("TEXT");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("TEXT");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("API.Models.Users.AppUserRole", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("RoleId")
                        .HasColumnType("INTEGER");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<int>("RoleId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("TEXT");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Value")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("API.Models.Projects.AppUserProject", b =>
                {
                    b.HasOne("API.Models.Projects.Project", "Project")
                        .WithMany("UserProjects")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Models.Users.AppUser", "User")
                        .WithMany("UserProjects")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Project");

                    b.Navigation("User");
                });

            modelBuilder.Entity("API.Models.Projects.TaskItem", b =>
                {
                    b.HasOne("API.Models.Projects.Project", "Project")
                        .WithMany("TaskItems")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("API.Models.Users.AppUser", "User")
                        .WithMany("TaskItems")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.Navigation("Project");

                    b.Navigation("User");
                });

            modelBuilder.Entity("API.Models.Timesheets.TimesheetCard", b =>
                {
                    b.HasOne("API.Models.Users.AppUser", "AppUser")
                        .WithMany("TimesheetCards")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("API.Models.Timesheets.TimesheetRecord", b =>
                {
                    b.HasOne("API.Models.Projects.Project", "Project")
                        .WithMany("TimesheetRecords")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("API.Models.Timesheets.TimesheetWeek", "TimesheetWeek")
                        .WithMany("TimesheetRecords")
                        .HasForeignKey("TimesheetWeekId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("API.Models.Timesheets.WorkType", "WorkType")
                        .WithMany()
                        .HasForeignKey("WorkTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Project");

                    b.Navigation("TimesheetWeek");

                    b.Navigation("WorkType");
                });

            modelBuilder.Entity("API.Models.Timesheets.TimesheetWeek", b =>
                {
                    b.HasOne("API.Models.Timesheets.TimesheetCard", "TimesheetCard")
                        .WithMany("TimesheetWeeks")
                        .HasForeignKey("TimesheetCardId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("TimesheetCard");
                });

            modelBuilder.Entity("API.Models.Users.AppUserRole", b =>
                {
                    b.HasOne("API.Models.Users.AppRole", "Role")
                        .WithMany("UserRoles")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Models.Users.AppUser", "User")
                        .WithMany("UserRoles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.HasOne("API.Models.Users.AppRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.HasOne("API.Models.Users.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.HasOne("API.Models.Users.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.HasOne("API.Models.Users.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("API.Models.Projects.Project", b =>
                {
                    b.Navigation("TaskItems");

                    b.Navigation("TimesheetRecords");

                    b.Navigation("UserProjects");
                });

            modelBuilder.Entity("API.Models.Timesheets.TimesheetCard", b =>
                {
                    b.Navigation("TimesheetWeeks");
                });

            modelBuilder.Entity("API.Models.Timesheets.TimesheetWeek", b =>
                {
                    b.Navigation("TimesheetRecords");
                });

            modelBuilder.Entity("API.Models.Users.AppRole", b =>
                {
                    b.Navigation("UserRoles");
                });

            modelBuilder.Entity("API.Models.Users.AppUser", b =>
                {
                    b.Navigation("TaskItems");

                    b.Navigation("TimesheetCards");

                    b.Navigation("UserProjects");

                    b.Navigation("UserRoles");
                });
#pragma warning restore 612, 618
        }
    }
}
