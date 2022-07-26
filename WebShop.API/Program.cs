using WebShop.API;
using Microsoft.EntityFrameworkCore;
using WebShop.Persistence;
using WebShop.Persistence.Repositories;
using WebShop.API.Filters;
using WebShop.Application.Services;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins,
                     policy =>
                     {
                         policy.WithOrigins("http://localhost:3000");
                         policy.WithMethods("GET", "POST", "PUT", "DELETE");
                         policy.AllowAnyHeader();
                     });
});

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = new Microsoft.AspNetCore.Http.PathString("/api/login");
        options.AccessDeniedPath = new Microsoft.AspNetCore.Http.PathString("/api/login");
        options.ExpireTimeSpan = TimeSpan.FromDays(30);
        options.Cookie.MaxAge = options.ExpireTimeSpan;
        options.SlidingExpiration = true;
    });

string connection = builder.Configuration.GetConnectionString("WebShopDB");
builder.Services.AddDbContext<WebShopContext>(options => options.UseSqlServer(connection));

builder.Services.AddTransient<SmartphonesRepository>();
builder.Services.AddTransient<BrandsRepository>();
builder.Services.AddTransient<AccountRepository>();

builder.Services.AddTransient<AuthService>();

builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("v1/swagger.json", "WebShop.API v1");
});

app.UseCors(MyAllowSpecificOrigins);
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
