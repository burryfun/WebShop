using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebShop.Persistence.Migrations
{
    public partial class addOrdersAndRefreshTokens : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "accounts",
                keyColumn: "Id",
                keyValue: new Guid("ce7f3925-cd39-424a-b72f-6ce6a50c5a87"));

            migrationBuilder.AddColumn<Guid>(
                name: "OrderId",
                table: "smartphones",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "orders",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_orders_accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RefreshToken",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Expires = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedByIp = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Revoked = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RevokedByIp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReplacedByToken = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshToken", x => new { x.AccountId, x.Id });
                    table.ForeignKey(
                        name: "FK_RefreshToken_accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "accounts",
                columns: new[] { "Id", "Email", "Password", "Role" },
                values: new object[] { new Guid("8606c6e7-7bc1-4831-905c-72ec3195c21e"), "admin@admin.com", "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", 0 });

            migrationBuilder.CreateIndex(
                name: "IX_smartphones_OrderId",
                table: "smartphones",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_orders_AccountId",
                table: "orders",
                column: "AccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_smartphones_orders_OrderId",
                table: "smartphones",
                column: "OrderId",
                principalTable: "orders",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_smartphones_orders_OrderId",
                table: "smartphones");

            migrationBuilder.DropTable(
                name: "orders");

            migrationBuilder.DropTable(
                name: "RefreshToken");

            migrationBuilder.DropIndex(
                name: "IX_smartphones_OrderId",
                table: "smartphones");

            migrationBuilder.DeleteData(
                table: "accounts",
                keyColumn: "Id",
                keyValue: new Guid("8606c6e7-7bc1-4831-905c-72ec3195c21e"));

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "smartphones");

            migrationBuilder.InsertData(
                table: "accounts",
                columns: new[] { "Id", "Email", "Password", "Role" },
                values: new object[] { new Guid("ce7f3925-cd39-424a-b72f-6ce6a50c5a87"), "admin@admin.com", "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", 0 });
        }
    }
}
