using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class WorkloadAdded2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Workloads_WorkloadId",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_WorkloadId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "WorkloadId",
                table: "Projects");

            migrationBuilder.AddColumn<int>(
                name: "ProjectId",
                table: "Workloads",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Workloads_ProjectId",
                table: "Workloads",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Workloads_Projects_ProjectId",
                table: "Workloads",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ProjectId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workloads_Projects_ProjectId",
                table: "Workloads");

            migrationBuilder.DropIndex(
                name: "IX_Workloads_ProjectId",
                table: "Workloads");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Workloads");

            migrationBuilder.AddColumn<int>(
                name: "WorkloadId",
                table: "Projects",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_WorkloadId",
                table: "Projects",
                column: "WorkloadId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Workloads_WorkloadId",
                table: "Projects",
                column: "WorkloadId",
                principalTable: "Workloads",
                principalColumn: "WorkloadId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
