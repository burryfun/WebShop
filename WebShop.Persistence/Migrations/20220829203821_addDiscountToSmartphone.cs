using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebShop.Persistence.Migrations
{
    public partial class addDiscountToSmartphone : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "accounts",
                keyColumn: "Id",
                keyValue: new Guid("045d08d6-d8b8-408c-8fa7-de89629fe31e"));

            migrationBuilder.AddColumn<decimal>(
                name: "Amount",
                table: "smartphones",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "Discount",
                table: "smartphones",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "accounts",
                columns: new[] { "Id", "Email", "Password", "Role" },
                values: new object[] { new Guid("df75307d-18a5-455f-8874-34aa9fab2aa0"), "admin@admin.com", "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", 0 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "accounts",
                keyColumn: "Id",
                keyValue: new Guid("df75307d-18a5-455f-8874-34aa9fab2aa0"));

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "smartphones");

            migrationBuilder.DropColumn(
                name: "Discount",
                table: "smartphones");

            migrationBuilder.InsertData(
                table: "accounts",
                columns: new[] { "Id", "Email", "Password", "Role" },
                values: new object[] { new Guid("045d08d6-d8b8-408c-8fa7-de89629fe31e"), "admin@admin.com", "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", 0 });
        }
    }
}
