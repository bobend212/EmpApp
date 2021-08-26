using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class RecordsUpdateDeleteConnectionsWithProjectsAndWorkTypes9 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimesheetRecords_Projects_ProjectId",
                table: "TimesheetRecords");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectId",
                table: "TimesheetRecords",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_TimesheetRecords_Projects_ProjectId",
                table: "TimesheetRecords",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ProjectId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimesheetRecords_Projects_ProjectId",
                table: "TimesheetRecords");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectId",
                table: "TimesheetRecords",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_TimesheetRecords_Projects_ProjectId",
                table: "TimesheetRecords",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ProjectId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
