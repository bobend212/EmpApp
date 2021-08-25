using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class WorkTypesAdded4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_TimesheetRecords_WorkTypeId",
                table: "TimesheetRecords");

            migrationBuilder.CreateIndex(
                name: "IX_TimesheetRecords_WorkTypeId",
                table: "TimesheetRecords",
                column: "WorkTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_TimesheetRecords_WorkTypeId",
                table: "TimesheetRecords");

            migrationBuilder.CreateIndex(
                name: "IX_TimesheetRecords_WorkTypeId",
                table: "TimesheetRecords",
                column: "WorkTypeId",
                unique: true);
        }
    }
}
