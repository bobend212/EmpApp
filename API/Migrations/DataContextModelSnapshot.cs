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

                    b.Property<string>("CustomName")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Date")
                        .HasColumnType("TEXT");

                    b.Property<float>("TotalTime")
                        .HasColumnType("REAL");

                    b.HasKey("TimesheetCardId");

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

                    b.Property<int?>("TimesheetCardId")
                        .HasColumnType("INTEGER");

                    b.HasKey("TimesheetRecordId");

                    b.HasIndex("TimesheetCardId");

                    b.ToTable("TimesheetRecords");
                });

            modelBuilder.Entity("API.Models.Timesheets.TimesheetRecord", b =>
                {
                    b.HasOne("API.Models.Timesheets.TimesheetCard", "TimesheetCard")
                        .WithMany("TimesheetRecords")
                        .HasForeignKey("TimesheetCardId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("TimesheetCard");
                });

            modelBuilder.Entity("API.Models.Timesheets.TimesheetCard", b =>
                {
                    b.Navigation("TimesheetRecords");
                });
#pragma warning restore 612, 618
        }
    }
}
