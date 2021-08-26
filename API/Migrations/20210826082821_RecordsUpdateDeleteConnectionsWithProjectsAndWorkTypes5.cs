using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class RecordsUpdateDeleteConnectionsWithProjectsAndWorkTypes5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "WorkTypeId",
                table: "TimesheetRecords",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectId",
                table: "TimesheetRecords",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.CreateIndex(
                name: "IX_TimesheetRecords_ProjectId",
                table: "TimesheetRecords",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_TimesheetRecords_WorkTypeId",
                table: "TimesheetRecords",
                column: "WorkTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_TimesheetRecords_Projects_ProjectId",
                table: "TimesheetRecords",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ProjectId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TimesheetRecords_WorkTypes_WorkTypeId",
                table: "TimesheetRecords",
                column: "WorkTypeId",
                principalTable: "WorkTypes",
                principalColumn: "WorkTypeId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimesheetRecords_Projects_ProjectId",
                table: "TimesheetRecords");

            migrationBuilder.DropForeignKey(
                name: "FK_TimesheetRecords_WorkTypes_WorkTypeId",
                table: "TimesheetRecords");

            migrationBuilder.DropIndex(
                name: "IX_TimesheetRecords_ProjectId",
                table: "TimesheetRecords");

            migrationBuilder.DropIndex(
                name: "IX_TimesheetRecords_WorkTypeId",
                table: "TimesheetRecords");

            migrationBuilder.AlterColumn<int>(
                name: "WorkTypeId",
                table: "TimesheetRecords",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ProjectId",
                table: "TimesheetRecords",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);
        }
    }
}
