
namespace WebShop.Domain.Models
{
    public class CheckoutRequest
    {
        public string Phone { get; set; }
        public string Address { get; set; }
        public decimal Total { get; set; }
        public List<Guid> SmartphonesId { get; set; }
    }
}
