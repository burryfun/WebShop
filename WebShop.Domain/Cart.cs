
namespace WebShop.Domain
{
    public class Cart
    {
        public Guid Id { get; set; }
        public Guid AccountId { get; set; }
        public List<Smartphone>? Smartphones { get; set; }
    }
}
