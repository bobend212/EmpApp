using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class EstimationEntityUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IssueDate",
                table: "Estimations");

            migrationBuilder.CreateIndex(
                name: "IX_Estimations_AuthorId",
                table: "Estimations",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Estimations_EditorId",
                table: "Estimations",
                column: "EditorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Estimations_AspNetUsers_AuthorId",
                table: "Estimations",
                column: "AuthorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Estimations_AspNetUsers_EditorId",
                table: "Estimations",
                column: "EditorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Estimations_AspNetUsers_AuthorId",
                table: "Estimations");

            migrationBuilder.DropForeignKey(
                name: "FK_Estimations_AspNetUsers_EditorId",
                table: "Estimations");

            migrationBuilder.DropIndex(
                name: "IX_Estimations_AuthorId",
                table: "Estimations");

            migrationBuilder.DropIndex(
                name: "IX_Estimations_EditorId",
                table: "Estimations");

            migrationBuilder.AddColumn<DateTime>(
                name: "IssueDate",
                table: "Estimations",
                type: "TEXT",
                nullable: true);
        }
    }
}
