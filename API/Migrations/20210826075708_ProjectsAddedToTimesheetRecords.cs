using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class ProjectsAddedToTimesheetRecords : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProjectId",
                table: "TimesheetRecords",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_TimesheetRecords_ProjectId",
                table: "TimesheetRecords",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_TimesheetRecords_Projects_ProjectId",
                table: "TimesheetRecords",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ProjectId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimesheetRecords_Projects_ProjectId",
                table: "TimesheetRecords");

            migrationBuilder.DropIndex(
                name: "IX_TimesheetRecords_ProjectId",
                table: "TimesheetRecords");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "TimesheetRecords");
        }
    }
}
