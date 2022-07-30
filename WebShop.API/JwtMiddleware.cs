using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using WebShop.Persistence.Repositories;

namespace WebShop.API
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _configuration;

        public JwtMiddleware(RequestDelegate next, IConfiguration configuration)
        {
            _next = next;
            _configuration = configuration;
        }

        public async Task Invoke(HttpContext context, AccountRepository accountRepository)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
                await attachAccountToContext(context, accountRepository, token);

            await _next(context);
        }

        private async Task attachAccountToContext(HttpContext context, AccountRepository accountRepository, string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();

                var jwtOptions = _configuration.GetSection("JwtOptions");
                var secret = jwtOptions.GetChildren().FirstOrDefault(secret => secret.Key == "Secret")?.Value;

                if (secret == null)
                {
                    throw new KeyNotFoundException("Secret not found");
                }

                var key = Encoding.ASCII.GetBytes(secret);

                TokenValidationParameters validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // tokens expire exactly at token expiration time(instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                };

                tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;

                var accountId = Guid.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);

                // attach account to context on successful jwt validation
                context.Items["Account"] = await accountRepository.GetByIdAsync(accountId);
            }
            catch
            {
                // do nothing if jwt validation fails
                // account is not attached to context so request won't have access to secure routes
            }
        }
    }
}
