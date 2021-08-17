using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class TimesheetCardIDchanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimesheetCards_AspNetUsers_AppUserId",
                table: "TimesheetCards");

            migrationBuilder.AlterColumn<int>(
                name: "AppUserId",
                table: "TimesheetCards",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

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

            migrationBuilder.AlterColumn<int>(
                name: "AppUserId",
                table: "TimesheetCards",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

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
