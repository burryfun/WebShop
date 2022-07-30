using Microsoft.EntityFrameworkCore;
using WebShop.Domain;

namespace WebShop.Persistence.Repositories
{
    public class AccountRepository
    {
        private readonly WebShopContext _context;

        public AccountRepository(WebShopContext context)
        {
            _context = context;
        }

        public async Task<Account> CreateAsync(Account account)
        {
            if (account == null)
            {
                throw new ArgumentNullException(nameof(account));
            }

            await _context.AddAsync(account);
            await _context.SaveChangesAsync();
            return account;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var account = await GetByIdAsync(id);

            if (account != null)
            {
                _context.accounts.Remove(account);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public IEnumerable<Account> GetAll()
        {
            throw new NotImplementedException();
        }

        public async Task<Account> GetByIdAsync(Guid id)
        {
            var account = await _context.accounts.FirstOrDefaultAsync(x => x.Id == id);
            return account;
        }

        public async Task<Account> GetByEmailAsync(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                throw new ArgumentNullException(nameof(email));
            }

            string lowerEmail = email.ToLower();
            var account = await _context.accounts.FirstOrDefaultAsync(x => x.Email == lowerEmail);

            return account;
        }

        public async Task<Account> GetByEmailAndPasswordAsync(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                throw new ArgumentNullException("Email or password is null");
            }

            string lowerEmail = email.ToLower();

            var account = await _context.accounts.FirstOrDefaultAsync(x => 
                x.Email.ToLower() == lowerEmail && 
                x.Password == password);

            return account;
        }

        public async Task Update(Account account)
        {
            _context.Update(account);
            await _context.SaveChangesAsync();
        }
    }
}
