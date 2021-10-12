using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class EstimatingAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Estimations",
                columns: table => new
                {
                    EstimationId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Panels = table.Column<float>(type: "REAL", nullable: false),
                    Floor = table.Column<float>(type: "REAL", nullable: false),
                    Roof = table.Column<float>(type: "REAL", nullable: false),
                    Steel = table.Column<float>(type: "REAL", nullable: false),
                    DouglasFirs = table.Column<float>(type: "REAL", nullable: false),
                    GPFrames = table.Column<float>(type: "REAL", nullable: false),
                    Checking = table.Column<float>(type: "REAL", nullable: false),
                    Issuing = table.Column<float>(type: "REAL", nullable: false),
                    Slab = table.Column<float>(type: "REAL", nullable: false),
                    Sections = table.Column<float>(type: "REAL", nullable: false),
                    Other = table.Column<float>(type: "REAL", nullable: false),
                    Total = table.Column<float>(type: "REAL", nullable: false),
                    IssueDate = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Create = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Edit = table.Column<DateTime>(type: "TEXT", nullable: true),
                    AuthorId = table.Column<int>(type: "INTEGER", nullable: true),
                    EditorId = table.Column<int>(type: "INTEGER", nullable: true),
                    ProjectId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Estimations", x => x.EstimationId);
                    table.ForeignKey(
                        name: "FK_Estimations_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "ProjectId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Estimations_ProjectId",
                table: "Estimations",
                column: "ProjectId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Estimations");
        }
    }
}
