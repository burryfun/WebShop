using WebShop.Domain;

namespace WebShop.Persistence.Repositories
{
    public class BrandsRepository : IRepository<Brand>
    {
        private readonly WebShopContext _context;

        public BrandsRepository(WebShopContext context)
        {
            _context = context;
        }

        public Brand Create(Brand brand)
        {
            if (brand == null)
            {
                throw new ArgumentNullException(nameof(brand));
            }

            _context.Add(brand);
            _context.SaveChanges();
            return brand;
        }

        public Brand GetById(Guid id)
        {
            var brand = _context.brands.FirstOrDefault(x => x.Id == id);
            return brand;
        }

        public Brand GetByName(string name)
        {
            var brand = _context.brands.FirstOrDefault(x => x.Name == name);
            return brand;
        }

        public IEnumerable<Brand> GetAll()
        {
            return _context.brands;
        }

        public Brand Update(Brand brand)
        {
            if (brand == null)
            {
                throw new ArgumentNullException(nameof(brand));
            }

            _context.Update(brand);
            _context.SaveChanges();
            return brand;
        }

        public bool Delete(Guid id)
        {
            var brand = GetById(id);

            if (brand != null)
            {
                _context.brands.Remove(brand);
                _context.SaveChanges();
                return true;
            }

            return false;
        }
    }
}
