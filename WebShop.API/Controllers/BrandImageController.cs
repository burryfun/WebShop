using Microsoft.AspNetCore.Mvc;
using WebShop.API.ViewModels;


namespace WebShop.API.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class BrandImageController : ControllerBase
    {

        [HttpGet("api/images")]
        public IActionResult DownloadImage(string imageName)
        {
            if (imageName != null)
            {
                string fullPath = $"{Directory.GetCurrentDirectory()}/images/{imageName}";
                if (System.IO.File.Exists(fullPath))
                {
                    return PhysicalFile(fullPath, "image/svg+xml");
                }
            }
            return BadRequest();
        }

        [HttpPost("api/images")]
        public async Task<IActionResult> UploadImage([FromForm] ImageViewModel imageViewModel)
        {
            if (imageViewModel.Image != null)
            {
                var imageName = imageViewModel.Name;
                var fullPath = $"{Directory.GetCurrentDirectory()}/images/{imageName}";
                using (var fileStream = new FileStream(fullPath, FileMode.Create))
                {
                    await imageViewModel.Image.CopyToAsync(fileStream);
                }
                return Ok();
            }
            return BadRequest();
        }
    }
}