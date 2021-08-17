using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class TimesheetCardEntityUpdate6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimesheetCards_AspNetUsers_AppUserId",
                table: "TimesheetCards");

            migrationBuilder.AddForeignKey(
                name: "FK_TimesheetCards_AspNetUsers_AppUserId",
                table: "TimesheetCards",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimesheetCards_AspNetUsers_AppUserId",
                table: "TimesheetCards");

            migrationBuilder.AddForeignKey(
                name: "FK_TimesheetCards_AspNetUsers_AppUserId",
                table: "TimesheetCards",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
