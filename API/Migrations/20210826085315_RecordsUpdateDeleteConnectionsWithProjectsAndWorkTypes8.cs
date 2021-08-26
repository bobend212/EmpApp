using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class RecordsUpdateDeleteConnectionsWithProjectsAndWorkTypes8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppUserProject_Projects_ProjectId",
                table: "AppUserProject");

            migrationBuilder.AddForeignKey(
                name: "FK_AppUserProject_Projects_ProjectId",
                table: "AppUserProject",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ProjectId",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppUserProject_Projects_ProjectId",
                table: "AppUserProject");

            migrationBuilder.AddForeignKey(
                name: "FK_AppUserProject_Projects_ProjectId",
                table: "AppUserProject",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ProjectId");
        }
    }
}
