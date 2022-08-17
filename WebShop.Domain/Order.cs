
namespace WebShop.Domain
{
    public class Order
    {
        public Guid Id { get; set; }
        public Account Account { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public decimal Total { get; set; }
        public DateTime Created { get; set; }
        public List<Smartphone> Smartphones { get; set; }
    }
}
