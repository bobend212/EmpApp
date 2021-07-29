using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class StatusAddedToCards : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "TimesheetCards",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "TimesheetCards");
        }
    }
}
