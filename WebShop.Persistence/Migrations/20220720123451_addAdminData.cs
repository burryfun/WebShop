using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebShop.Persistence.Migrations
{
    public partial class addAdminData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "accounts",
                columns: new[] { "Id", "Email", "Password", "Role" },
                values: new object[] { new Guid("ce7f3925-cd39-424a-b72f-6ce6a50c5a87"), "admin@admin.com", "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", 0 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "accounts",
                keyColumn: "Id",
                keyValue: new Guid("ce7f3925-cd39-424a-b72f-6ce6a50c5a87"));
        }
    }
}
