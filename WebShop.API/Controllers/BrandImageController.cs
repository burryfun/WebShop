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
                else
                {
                    return PhysicalFile($"{Directory.GetCurrentDirectory()}/images/SampleImage.svg", "image/svg+xml");
                }
            }
            return BadRequest();
        }

        [HttpPost("api/images")]
        public async Task<IActionResult> UploadImage([FromForm] ImageViewModel imageViewModel)
        {
            string imagesPath = $"{Directory.GetCurrentDirectory()}/images";

            if (!Directory.Exists(imagesPath))
            {
                Directory.CreateDirectory(imagesPath);
            }

            if (imageViewModel.Image != null)
            {
                var imageName = imageViewModel.Name;
                var fullPath = $"{imagesPath}/{imageName}";
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