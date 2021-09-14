using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class TaskEntityEditedStageAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ItemStage",
                table: "TaskItems",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ItemStage",
                table: "TaskItems");
        }
    }
}
