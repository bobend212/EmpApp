using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class TimesheetCardEntityUpdate3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimesheetCards_AspNetUsers_AppUserId",
                table: "TimesheetCards");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "TimesheetCards",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_TimesheetCards_AspNetUsers_AppUserId",
                table: "TimesheetCards",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimesheetCards_AspNetUsers_AppUserId",
                table: "TimesheetCards");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "TimesheetCards");

            migrationBuilder.AddForeignKey(
                name: "FK_TimesheetCards_AspNetUsers_AppUserId",
                table: "TimesheetCards",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
