using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class WeeklyTimesheetAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimesheetRecords_TimesheetCards_TimesheetCardId",
                table: "TimesheetRecords");

            migrationBuilder.RenameColumn(
                name: "TimesheetCardId",
                table: "TimesheetRecords",
                newName: "TimesheetWeekId");

            migrationBuilder.RenameIndex(
                name: "IX_TimesheetRecords_TimesheetCardId",
                table: "TimesheetRecords",
                newName: "IX_TimesheetRecords_TimesheetWeekId");

            migrationBuilder.CreateTable(
                name: "TimesheetWeeks",
                columns: table => new
                {
                    TimesheetWeekId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    StartWeek = table.Column<DateTime>(type: "TEXT", nullable: false),
                    EndWeek = table.Column<DateTime>(type: "TEXT", nullable: false),
                    WeekNo = table.Column<int>(type: "INTEGER", nullable: false),
                    TotalWeekly = table.Column<float>(type: "REAL", nullable: false),
                    TimesheetCardId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimesheetWeeks", x => x.TimesheetWeekId);
                    table.ForeignKey(
                        name: "FK_TimesheetWeeks_TimesheetCards_TimesheetCardId",
                        column: x => x.TimesheetCardId,
                        principalTable: "TimesheetCards",
                        principalColumn: "TimesheetCardId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TimesheetWeeks_TimesheetCardId",
                table: "TimesheetWeeks",
                column: "TimesheetCardId");

            migrationBuilder.AddForeignKey(
                name: "FK_TimesheetRecords_TimesheetWeeks_TimesheetWeekId",
                table: "TimesheetRecords",
                column: "TimesheetWeekId",
                principalTable: "TimesheetWeeks",
                principalColumn: "TimesheetWeekId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimesheetRecords_TimesheetWeeks_TimesheetWeekId",
                table: "TimesheetRecords");

            migrationBuilder.DropTable(
                name: "TimesheetWeeks");

            migrationBuilder.RenameColumn(
                name: "TimesheetWeekId",
                table: "TimesheetRecords",
                newName: "TimesheetCardId");

            migrationBuilder.RenameIndex(
                name: "IX_TimesheetRecords_TimesheetWeekId",
                table: "TimesheetRecords",
                newName: "IX_TimesheetRecords_TimesheetCardId");

            migrationBuilder.AddForeignKey(
                name: "FK_TimesheetRecords_TimesheetCards_TimesheetCardId",
                table: "TimesheetRecords",
                column: "TimesheetCardId",
                principalTable: "TimesheetCards",
                principalColumn: "TimesheetCardId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
