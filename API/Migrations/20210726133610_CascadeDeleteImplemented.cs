using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class CascadeDeleteImplemented : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimesheetRecords_TimesheetCards_TimesheetCardId",
                table: "TimesheetRecords");

            migrationBuilder.AddForeignKey(
                name: "FK_TimesheetRecords_TimesheetCards_TimesheetCardId",
                table: "TimesheetRecords",
                column: "TimesheetCardId",
                principalTable: "TimesheetCards",
                principalColumn: "TimesheetCardId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimesheetRecords_TimesheetCards_TimesheetCardId",
                table: "TimesheetRecords");

            migrationBuilder.AddForeignKey(
                name: "FK_TimesheetRecords_TimesheetCards_TimesheetCardId",
                table: "TimesheetRecords",
                column: "TimesheetCardId",
                principalTable: "TimesheetCards",
                principalColumn: "TimesheetCardId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
