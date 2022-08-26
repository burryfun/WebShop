using Microsoft.EntityFrameworkCore;
using WebShop.Persistence;

namespace WebShop.API
{
    public static class MigrationManager
    {
        public static void MigrateDatabase(IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.CreateScope())
            {
                scope.ServiceProvider.GetService<WebShopContext>().Database.Migrate();
            }
        }
    }
}
