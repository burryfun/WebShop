using WebShop.Domain;
using WebShop.Domain.Dto;

namespace WebShop.Persistence.Repositories
{
    public class SmartphonesRepository : IRepository<Smartphone>
    {
        
        private readonly WebShopContext _context;

        public SmartphonesRepository(WebShopContext context)
        {
            _context = context;
        }

        public Smartphone Create(Smartphone smartphone)
        {
            if (smartphone == null)
            {
                throw new ArgumentNullException(nameof(smartphone));
            }

            _context.smartphones.Add(smartphone);
            _context.SaveChanges();
            return smartphone;
        }

        public Smartphone GetById(Guid id)
        {
            var smartphone = _context.smartphones.FirstOrDefault(x => x.Id == id);
            return smartphone;
        }

        public CartDto GetBrandAndSmartphoneById(Guid id)
        {
            var result = _context.smartphones.Join(
                _context.brands,
                s => s.BrandId,
                b => b.Id,
                (s, b) => new CartDto
                {
                    SmartphoneId = s.Id,
                    SmartphoneName = s.Name,
                    SmartphonePrice = s.Price,
                    BrandName = b.Name
                }).Where(s => s.SmartphoneId == id).Single();
            return result;
        }

        public IEnumerable<Smartphone> GetAll()
        {
            return _context.smartphones;
        }

        public IEnumerable<Smartphone> GetAllByBrandId(Guid brandId)
        {
            var smartphonesByBrandId = _context.smartphones.Where(x => x.BrandId == brandId).ToList();
            return smartphonesByBrandId;
        }

        public Smartphone Update(Smartphone smartphone)
        {
            if (smartphone == null)
            {
                throw new ArgumentNullException(nameof(smartphone));
            }

            _context.Update(smartphone);
            _context.SaveChanges();
            return smartphone;
        }

        public bool Delete(Guid id)
        {
            var smartphone = GetById(id);

            if (smartphone != null)
            {
                _context.smartphones.Remove(smartphone);
                _context.SaveChanges();
                return true;
            }

            return false;
        }
    }
}
