using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class TotalTimeToCards : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "TotalTime",
                table: "TimesheetCards",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalTime",
                table: "TimesheetCards");
        }
    }
}
