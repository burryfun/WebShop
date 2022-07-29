using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using WebShop.Domain;
using WebShop.Persistence.Repositories;

namespace WebShop.Application.Services
{

    public class AuthService
    {
        private readonly AccountRepository _accountRepository;

        private readonly IConfiguration _configuration;
        public AuthService(AccountRepository accountRepository, IConfiguration configuration)
        {
            _accountRepository = accountRepository;
            _configuration = configuration;
        }

        public async Task<Account> CreateAsync(string email, string password)
        {

            var account = await _accountRepository.CreateAsync(new Account { Email = email, Password = GetPasswordHashString(password), Role = Role.User });
            return account;
        }

        public async Task<Account> FindByEmailAsync(string email)
        {
            var account = await _accountRepository.GetByEmailAsync(email);

            if (account == null)
            {
                Console.WriteLine($"Account: {email} not found");
            }

            return account;
        }

        public async Task<bool> CheckPasswordAsync(Account account, string password)
        {
            var result = await _accountRepository.GetByEmailAndPasswordAsync(account.Email, GetPasswordHashString(password));

            if (result == null)
            {
                return false;
            }

            return true;
        }

        public async Task<bool> Delete(string email)
        {
            Account account = await _accountRepository.GetByEmailAsync(email);

            if (account == null)
            {
                return false;
            }

            await _accountRepository.DeleteAsync(account.Id);
            return true;
        }

        private static string GetPasswordHashString(string password)
        {
            var crypt = new SHA256Managed();
            var hash = new StringBuilder();
            byte[] crypto = crypt.ComputeHash(Encoding.UTF8.GetBytes(password));
            foreach (byte theByte in crypto)
            {
                hash.Append(theByte.ToString("x2"));
            }
            return hash.ToString();
        }

        public string GenerateJWT(Account account)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtOptions = _configuration.GetSection("JwtOptions");
            var secret = jwtOptions.GetChildren().FirstOrDefault(secret => secret.Key == "Secret")?.Value;

            if (secret == null)
            {
                throw new KeyNotFoundException("Secret not found");
            }

            var key = Encoding.UTF8.GetBytes(secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", account.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddMinutes(15),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
