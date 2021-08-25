using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class WorkTypesAdded2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkTypes_TimesheetRecords_WorkTypeId",
                table: "WorkTypes");

            migrationBuilder.AlterColumn<int>(
                name: "WorkTypeId",
                table: "WorkTypes",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.CreateIndex(
                name: "IX_TimesheetRecords_WorkTypeId",
                table: "TimesheetRecords",
                column: "WorkTypeId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_TimesheetRecords_WorkTypes_WorkTypeId",
                table: "TimesheetRecords",
                column: "WorkTypeId",
                principalTable: "WorkTypes",
                principalColumn: "WorkTypeId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimesheetRecords_WorkTypes_WorkTypeId",
                table: "TimesheetRecords");

            migrationBuilder.DropIndex(
                name: "IX_TimesheetRecords_WorkTypeId",
                table: "TimesheetRecords");

            migrationBuilder.AlterColumn<int>(
                name: "WorkTypeId",
                table: "WorkTypes",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkTypes_TimesheetRecords_WorkTypeId",
                table: "WorkTypes",
                column: "WorkTypeId",
                principalTable: "TimesheetRecords",
                principalColumn: "TimesheetRecordId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
