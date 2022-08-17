using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebShop.Persistence.Migrations
{
    public partial class addTotalToOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "accounts",
                keyColumn: "Id",
                keyValue: new Guid("8606c6e7-7bc1-4831-905c-72ec3195c21e"));

            migrationBuilder.AddColumn<decimal>(
                name: "Total",
                table: "orders",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.InsertData(
                table: "accounts",
                columns: new[] { "Id", "Email", "Password", "Role" },
                values: new object[] { new Guid("045d08d6-d8b8-408c-8fa7-de89629fe31e"), "admin@admin.com", "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", 0 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "accounts",
                keyColumn: "Id",
                keyValue: new Guid("045d08d6-d8b8-408c-8fa7-de89629fe31e"));

            migrationBuilder.DropColumn(
                name: "Total",
                table: "orders");

            migrationBuilder.InsertData(
                table: "accounts",
                columns: new[] { "Id", "Email", "Password", "Role" },
                values: new object[] { new Guid("8606c6e7-7bc1-4831-905c-72ec3195c21e"), "admin@admin.com", "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", 0 });
        }
    }
}
