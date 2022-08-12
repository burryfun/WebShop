using WebShop.Domain;

namespace WebShop.Persistence.Repositories
{
    public class OrdersRepository : IRepository<Order>
    {

        private readonly WebShopContext _context;

        public OrdersRepository(WebShopContext context)
        {
            _context = context;
        }

        public Order Create(Order order)
        {
            if (order == null)
            {
                throw new ArgumentNullException(nameof(order));
            }

            _context.orders.Add(order);
            _context.SaveChanges();
            return order;
        }

        public Order GetById(Guid id)
        {
            var order = _context.orders.FirstOrDefault(x => x.Id == id);
            return order;
        }

        public bool Delete(Guid id)
        {
            var order = GetById(id);

            if (order != null)
            {
                _context.orders.Remove(order);
                _context.SaveChanges();
                return true;
            }

            return false;
        }


        public IEnumerable<Order> GetAll()
        {
            return _context.orders;
        }

        

        public Order Update(Order order)
        {
            throw new NotImplementedException();
        }
    }
}
