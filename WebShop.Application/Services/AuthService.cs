using System;
using System.Collections.Generic;
using System.Linq;
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
        public AuthService(AccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
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
    }
}
