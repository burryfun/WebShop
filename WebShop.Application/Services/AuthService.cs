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
using WebShop.Domain.Models;
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

        public async Task<AuthenticateResponse> Authenticate(AuthenticateRequest request, string ipAddress)
        {
            var account = await _accountRepository.GetByEmailAsync(request.Email);

            if (account == null)
            {
                return new AuthenticateResponse { IsSuccess = false, Message = $"User {request.Email} not exists" };
            }

            if (account.Password != GetPasswordHashString(request.Password))
            {
                return new AuthenticateResponse { IsSuccess = false, Message = "Password is incorrect" };
            }

            var accessToken = GenerateJWT(account);
            var refreshToken = generateRefreshToken(ipAddress);

            account.RefreshTokens.Add(refreshToken);

            removeOldRefreshTokens(account);

            await _accountRepository.UpdateAsync(account);

            var response = new AuthenticateResponse
            {
                IsSuccess = true,
                Message = "Authentication successful",
                JwtToken = accessToken,
                RefreshToken = refreshToken.Token
            };

            return response;
        }

        public async Task<RegisterResponse> Register(RegisterRequest request)
        {
            var checkAccount = await _accountRepository.GetByEmailAsync(request.Email);

            if (checkAccount != null)
            {
                return new RegisterResponse { IsSuccess = false, Message = "This user already exists" };
            }

            var account = new Account
            {
                Email = request.Email,
                Password = GetPasswordHashString(request.Password),
                Role = Role.User
            };

            await _accountRepository.CreateAsync(account);

            return new RegisterResponse
            {
                AccountId = account.Id,
                Email = account.Email,
                IsSuccess = true,
                Message = $"User {account.Email} registered",
            };
        }

        public async Task<AuthenticateResponse> RefreshToken(string oldToken, string ipAddress)
        {
            var (refreshToken, account) = await getRefreshTokenAndAccountAsync(oldToken);

            // replace old refresh token with a new one and save
            var newRefreshToken = generateRefreshToken(ipAddress);
            refreshToken.Revoked = DateTime.UtcNow;
            refreshToken.RevokedByIp = ipAddress;
            refreshToken.ReplacedByToken = newRefreshToken.Token;
            account.RefreshTokens.Add(newRefreshToken);

            removeOldRefreshTokens(account);

            await _accountRepository.UpdateAsync(account);

            var accessToken = GenerateJWT(account);

            var response = new AuthenticateResponse
            {
                IsSuccess = true,
                Message = "Authentication successful",
                JwtToken = accessToken,
                RefreshToken = newRefreshToken.Token
            };

            return response;
        }

        public async Task RevokeToken(string currentToken, string ipAddress)
        {
            var (refreshToken, account) = await getRefreshTokenAndAccountAsync(currentToken);

            refreshToken.Revoked = DateTime.UtcNow;
            refreshToken.RevokedByIp = ipAddress;

            await _accountRepository.UpdateAsync(account);
        }

        private async Task<(RefreshToken, Account)> getRefreshTokenAndAccountAsync(string oldToken)
        {
            var account = await _accountRepository.GetByTokenAsync(oldToken);

            if (account == null)
            {
                throw new Exception("Invalid token");
            }

            var refreshToken = account.RefreshTokens.Single(t => t.Token == oldToken);
            if (refreshToken == null)
            {
                throw new Exception("Invalid token");
            }

            return (refreshToken, account);
        }

        private RefreshToken generateRefreshToken(string ipAddress)
        {
            return new RefreshToken
            {
                Token = randomTokenString(),
                Expires = DateTime.UtcNow.AddDays(7),
                Created = DateTime.UtcNow,
                CreatedByIp = ipAddress
            };
        }

        private void removeOldRefreshTokens(Account account)
        {
            var jwtOptions = _configuration.GetSection("JwtOptions");
            var tokenTTL = jwtOptions.GetChildren().FirstOrDefault(tokenTTL => tokenTTL.Key == "RefreshTokenTTL")?.Value;

            account.RefreshTokens.RemoveAll(x =>
                !x.IsActive &&
                x.Created.AddDays(Convert.ToDouble(tokenTTL)) <= DateTime.UtcNow);
        }

        private string randomTokenString()
        {
            using var rngCryptoServiceProvider = new RNGCryptoServiceProvider();
            var randomBytes = new byte[40];
            rngCryptoServiceProvider.GetBytes(randomBytes);
            // convert random bytes to hex string
            return BitConverter.ToString(randomBytes).Replace("-", "");
        }

        public async Task<Account> CreateAsync(string email, string password)
        {

            var account = await _accountRepository.CreateAsync(
                new Account { 
                    Email = email, 
                    Password = GetPasswordHashString(password), 
                    Role = Role.User 
                });
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

        public async Task<Account> FindByIdAsync(Guid id)
        {
            var account = await _accountRepository.GetByIdAsync(id);

            if (account == null)
            {
                Console.WriteLine($"Account: {id} not found");
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

        public async Task DeleteByIdAsync(Guid id)
        {
            await _accountRepository.DeleteAsync(id);
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
