using Microsoft.EntityFrameworkCore;
using WebShop.Domain;

namespace WebShop.Persistence
{
    public class WebShopContext : DbContext
    {
        public WebShopContext(DbContextOptions<WebShopContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>().HasData(
                new Account
                {
                    Email = "admin@admin.com",
                    Id = Guid.NewGuid(),
                    Password = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
                    Role = Role.Admin,
                    RefreshTokens = new List<RefreshToken>() {}
                });
        }

        public DbSet<Smartphone> smartphones { get; set; }

        public DbSet<Brand> brands { get; set; }

        public DbSet<Account> accounts { get; set; }

        public DbSet<Order> orders { get; set; }
    }
}
