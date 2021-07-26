using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class TimesheetRecordsAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TimesheetRecords",
                columns: table => new
                {
                    TimesheetRecordId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Time = table.Column<float>(type: "REAL", nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    TimesheetCardId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimesheetRecords", x => x.TimesheetRecordId);
                    table.ForeignKey(
                        name: "FK_TimesheetRecords_TimesheetCards_TimesheetCardId",
                        column: x => x.TimesheetCardId,
                        principalTable: "TimesheetCards",
                        principalColumn: "TimesheetCardId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TimesheetRecords_TimesheetCardId",
                table: "TimesheetRecords",
                column: "TimesheetCardId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TimesheetRecords");
        }
    }
}
