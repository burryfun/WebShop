
namespace WebShop.Domain
{
    public class Smartphone
    {
        public Guid Id { get; set; }
        public Guid BrandId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Discount { get; set; } = 0;
        public decimal Amount { get; set; }

        //string ImageUrl { get; set; }

        /*
         * specification...
         * specification...
         * specification...
         * specification...
         * specification...
         */
    }
}
