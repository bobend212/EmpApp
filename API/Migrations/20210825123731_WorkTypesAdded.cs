using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class WorkTypesAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WorkTypeId",
                table: "TimesheetRecords",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "WorkTypes",
                columns: table => new
                {
                    WorkTypeId = table.Column<int>(type: "INTEGER", nullable: false),
                    WorkTypeName = table.Column<string>(type: "TEXT", nullable: true),
                    WorkTypeNumber = table.Column<int>(type: "INTEGER", nullable: false),
                    Type = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkTypes", x => x.WorkTypeId);
                    table.ForeignKey(
                        name: "FK_WorkTypes_TimesheetRecords_WorkTypeId",
                        column: x => x.WorkTypeId,
                        principalTable: "TimesheetRecords",
                        principalColumn: "TimesheetRecordId",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WorkTypes");

            migrationBuilder.DropColumn(
                name: "WorkTypeId",
                table: "TimesheetRecords");
        }
    }
}
