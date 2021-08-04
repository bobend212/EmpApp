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
                .HasAnnotation("ProductVersion", "5.0.8");

            modelBuilder.Entity("API.Models.Timesheets.TimesheetCard", b =>
                {
                    b.Property<int>("TimesheetCardId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AppUserId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("CustomName")
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

                    b.Property<float>("Time")
                        .HasColumnType("REAL");

                    b.Property<int?>("TimesheetWeekId")
                        .HasColumnType("INTEGER");

                    b.HasKey("TimesheetRecordId");

                    b.HasIndex("TimesheetWeekId");

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

            modelBuilder.Entity("API.Models.Users.AppUser", b =>
                {
                    b.Property<int>("AppUserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Created")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("TEXT");

                    b.Property<string>("Gender")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("HireDate")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("LastActive")
                        .HasColumnType("TEXT");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("BLOB");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("BLOB");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserName")
                        .HasColumnType("TEXT");

                    b.HasKey("AppUserId");

                    b.ToTable("Users");
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
                    b.HasOne("API.Models.Timesheets.TimesheetWeek", "TimesheetWeek")
                        .WithMany("TimesheetRecords")
                        .HasForeignKey("TimesheetWeekId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("TimesheetWeek");
                });

            modelBuilder.Entity("API.Models.Timesheets.TimesheetWeek", b =>
                {
                    b.HasOne("API.Models.Timesheets.TimesheetCard", "TimesheetCard")
                        .WithMany("TimesheetWeeks")
                        .HasForeignKey("TimesheetCardId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("TimesheetCard");
                });

            modelBuilder.Entity("API.Models.Timesheets.TimesheetCard", b =>
                {
                    b.Navigation("TimesheetWeeks");
                });

            modelBuilder.Entity("API.Models.Timesheets.TimesheetWeek", b =>
                {
                    b.Navigation("TimesheetRecords");
                });

            modelBuilder.Entity("API.Models.Users.AppUser", b =>
                {
                    b.Navigation("TimesheetCards");
                });
#pragma warning restore 612, 618
        }
    }
}
