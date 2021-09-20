using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class WorkloadAdded3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Workloads_ProjectId",
                table: "Workloads");

            migrationBuilder.CreateIndex(
                name: "IX_Workloads_ProjectId",
                table: "Workloads",
                column: "ProjectId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Workloads_ProjectId",
                table: "Workloads");

            migrationBuilder.CreateIndex(
                name: "IX_Workloads_ProjectId",
                table: "Workloads",
                column: "ProjectId");
        }
    }
}
