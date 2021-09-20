using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class WorkloadAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WorkloadId",
                table: "Projects",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Workloads",
                columns: table => new
                {
                    WorkloadId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    OrderPlaced = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Site = table.Column<string>(type: "TEXT", nullable: true),
                    DesignInfo = table.Column<string>(type: "TEXT", nullable: true),
                    DrgsReceived = table.Column<bool>(type: "INTEGER", nullable: false),
                    EngReceived = table.Column<bool>(type: "INTEGER", nullable: false),
                    SlabStage = table.Column<string>(type: "TEXT", nullable: true),
                    BRegsStage = table.Column<string>(type: "TEXT", nullable: true),
                    ProductionStage = table.Column<string>(type: "TEXT", nullable: true),
                    Issued = table.Column<bool>(type: "INTEGER", nullable: false),
                    Planner = table.Column<string>(type: "TEXT", nullable: true),
                    EstimDesignTime = table.Column<float>(type: "REAL", nullable: false),
                    SlabRequired = table.Column<DateTime>(type: "TEXT", nullable: true),
                    SlabEstimated = table.Column<DateTime>(type: "TEXT", nullable: true),
                    SlabIssued = table.Column<DateTime>(type: "TEXT", nullable: true),
                    BRegsRequired = table.Column<DateTime>(type: "TEXT", nullable: true),
                    BRegsEstimated = table.Column<DateTime>(type: "TEXT", nullable: true),
                    BRegsIssued = table.Column<DateTime>(type: "TEXT", nullable: true),
                    FullSetRequired = table.Column<DateTime>(type: "TEXT", nullable: true),
                    FullSetEstimated = table.Column<DateTime>(type: "TEXT", nullable: true),
                    FullSetIssued = table.Column<DateTime>(type: "TEXT", nullable: true),
                    IssuingRequired = table.Column<DateTime>(type: "TEXT", nullable: true),
                    IssuingEstimated = table.Column<DateTime>(type: "TEXT", nullable: true),
                    IssuingIssued = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Delivery = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Comments = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workloads", x => x.WorkloadId);
                });

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Workloads_WorkloadId",
                table: "Projects");

            migrationBuilder.DropTable(
                name: "Workloads");

            migrationBuilder.DropIndex(
                name: "IX_Projects_WorkloadId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "WorkloadId",
                table: "Projects");
        }
    }
}
