namespace WebShop.Domain.Models
{
    public class AuthenticateResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public string JwtToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
