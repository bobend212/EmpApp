using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class UserProjectTableAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppUserProject_AspNetUsers_UserId",
                table: "AppUserProject");

            migrationBuilder.DropForeignKey(
                name: "FK_AppUserProject_Projects_ProjectId",
                table: "AppUserProject");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppUserProject",
                table: "AppUserProject");

            migrationBuilder.RenameTable(
                name: "AppUserProject",
                newName: "UserProjects");

            migrationBuilder.RenameIndex(
                name: "IX_AppUserProject_ProjectId",
                table: "UserProjects",
                newName: "IX_UserProjects_ProjectId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserProjects",
                table: "UserProjects",
                columns: new[] { "UserId", "ProjectId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserProjects_AspNetUsers_UserId",
                table: "UserProjects",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserProjects_Projects_ProjectId",
                table: "UserProjects",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ProjectId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserProjects_AspNetUsers_UserId",
                table: "UserProjects");

            migrationBuilder.DropForeignKey(
                name: "FK_UserProjects_Projects_ProjectId",
                table: "UserProjects");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserProjects",
                table: "UserProjects");

            migrationBuilder.RenameTable(
                name: "UserProjects",
                newName: "AppUserProject");

            migrationBuilder.RenameIndex(
                name: "IX_UserProjects_ProjectId",
                table: "AppUserProject",
                newName: "IX_AppUserProject_ProjectId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppUserProject",
                table: "AppUserProject",
                columns: new[] { "UserId", "ProjectId" });

            migrationBuilder.AddForeignKey(
                name: "FK_AppUserProject_AspNetUsers_UserId",
                table: "AppUserProject",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppUserProject_Projects_ProjectId",
                table: "AppUserProject",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ProjectId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
