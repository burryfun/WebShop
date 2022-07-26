using Microsoft.AspNetCore.Mvc;
using WebShop.API.ViewModels;



namespace WebShop.API.Controllers
{
    public class SmartphoneImageController : ControllerBase
    {

        [HttpGet("api/images/{brandName}")]
        public IActionResult DownloadImage(string brandName, string imageName)
        {
            if (imageName != null)
            {
                string fullPath = $"{Directory.GetCurrentDirectory()}/images/{brandName}/{imageName}.webp";

                if (System.IO.File.Exists(fullPath))
                {
                    return PhysicalFile(fullPath, "image/webp");
                }
            }
            return BadRequest();
        }

        [HttpPost("api/images/{brandName}")]
        public async Task<IActionResult> UploadImage(string brandName, [FromForm] ImageViewModel imageViewModel)
        {
            if (imageViewModel.Image != null)
            {
                var imageName = imageViewModel.Name;
                var directory = $"{Directory.GetCurrentDirectory()}/images/{brandName}";

                if (!System.IO.File.Exists(directory))
                {
                    System.IO.Directory.CreateDirectory(directory);
                }

                var fullPath = $"{directory}/{imageName}.webp";

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
