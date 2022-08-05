
namespace WebShop.Domain.Models
{
    public class RegisterResponse
    {
        public Guid AccountId { get; set; }
        public string Email { get; set; }
        public Role Role { get; set; }
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
    }

}
