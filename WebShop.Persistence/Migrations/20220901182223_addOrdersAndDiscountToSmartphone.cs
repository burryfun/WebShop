using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebShop.Persistence.Migrations
{
    public partial class addOrdersAndDiscountToSmartphone : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_smartphones_orders_OrderId",
                table: "smartphones");

            migrationBuilder.DropIndex(
                name: "IX_smartphones_OrderId",
                table: "smartphones");

            migrationBuilder.DeleteData(
                table: "accounts",
                keyColumn: "Id",
                keyValue: new Guid("045d08d6-d8b8-408c-8fa7-de89629fe31e"));

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "smartphones");

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

            migrationBuilder.CreateTable(
                name: "OrderSmartphone",
                columns: table => new
                {
                    OrdersId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SmartphonesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderSmartphone", x => new { x.OrdersId, x.SmartphonesId });
                    table.ForeignKey(
                        name: "FK_OrderSmartphone_orders_OrdersId",
                        column: x => x.OrdersId,
                        principalTable: "orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderSmartphone_smartphones_SmartphonesId",
                        column: x => x.SmartphonesId,
                        principalTable: "smartphones",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "accounts",
                columns: new[] { "Id", "Email", "Password", "Role" },
                values: new object[] { new Guid("61dffd0c-612d-4675-87e5-c5ef0d1489e6"), "admin@admin.com", "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", 0 });

            migrationBuilder.CreateIndex(
                name: "IX_OrderSmartphone_SmartphonesId",
                table: "OrderSmartphone",
                column: "SmartphonesId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderSmartphone");

            migrationBuilder.DeleteData(
                table: "accounts",
                keyColumn: "Id",
                keyValue: new Guid("61dffd0c-612d-4675-87e5-c5ef0d1489e6"));

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "smartphones");

            migrationBuilder.DropColumn(
                name: "Discount",
                table: "smartphones");

            migrationBuilder.AddColumn<Guid>(
                name: "OrderId",
                table: "smartphones",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.InsertData(
                table: "accounts",
                columns: new[] { "Id", "Email", "Password", "Role" },
                values: new object[] { new Guid("045d08d6-d8b8-408c-8fa7-de89629fe31e"), "admin@admin.com", "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", 0 });

            migrationBuilder.CreateIndex(
                name: "IX_smartphones_OrderId",
                table: "smartphones",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_smartphones_orders_OrderId",
                table: "smartphones",
                column: "OrderId",
                principalTable: "orders",
                principalColumn: "Id");
        }
    }
}
