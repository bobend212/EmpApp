using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class TimesheetCardEntityUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Id",
                table: "TimesheetCards");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "TimesheetCards",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
