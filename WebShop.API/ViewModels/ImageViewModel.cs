using Microsoft.AspNetCore.Http;

namespace WebShop.API.ViewModels
{
    public class ImageViewModel
    {
        public string Name { get; set; }
        public IFormFile Image { get; set; }
    }
}
