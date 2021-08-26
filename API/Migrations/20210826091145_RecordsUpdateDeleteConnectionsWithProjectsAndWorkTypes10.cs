using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class RecordsUpdateDeleteConnectionsWithProjectsAndWorkTypes10 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppUserProject_Projects_ProjectId",
                table: "AppUserProject");

            migrationBuilder.DropForeignKey(
                name: "FK_TimesheetRecords_Projects_ProjectId",
                table: "TimesheetRecords");

            migrationBuilder.AddForeignKey(
                name: "FK_AppUserProject_Projects_ProjectId",
                table: "AppUserProject",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ProjectId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TimesheetRecords_Projects_ProjectId",
                table: "TimesheetRecords",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ProjectId",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppUserProject_Projects_ProjectId",
                table: "AppUserProject");

            migrationBuilder.DropForeignKey(
                name: "FK_TimesheetRecords_Projects_ProjectId",
                table: "TimesheetRecords");

            migrationBuilder.AddForeignKey(
                name: "FK_AppUserProject_Projects_ProjectId",
                table: "AppUserProject",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ProjectId",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_TimesheetRecords_Projects_ProjectId",
                table: "TimesheetRecords",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ProjectId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
