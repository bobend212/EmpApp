using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class RecordsUpdateDeleteConnectionsWithProjectsAndWorkTypes2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_TimesheetRecords_ProjectId",
                table: "TimesheetRecords",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_TimesheetRecords_WorkTypeId",
                table: "TimesheetRecords",
                column: "WorkTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_TimesheetRecords_Projects_ProjectId",
                table: "TimesheetRecords",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ProjectId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TimesheetRecords_WorkTypes_WorkTypeId",
                table: "TimesheetRecords",
                column: "WorkTypeId",
                principalTable: "WorkTypes",
                principalColumn: "WorkTypeId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimesheetRecords_Projects_ProjectId",
                table: "TimesheetRecords");

            migrationBuilder.DropForeignKey(
                name: "FK_TimesheetRecords_WorkTypes_WorkTypeId",
                table: "TimesheetRecords");

            migrationBuilder.DropIndex(
                name: "IX_TimesheetRecords_ProjectId",
                table: "TimesheetRecords");

            migrationBuilder.DropIndex(
                name: "IX_TimesheetRecords_WorkTypeId",
                table: "TimesheetRecords");
        }
    }
}
