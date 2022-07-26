using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebShop.Domain;
using WebShop.Persistence.Repositories;

namespace WebShop.API.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class CatalogController : ControllerBase
    {
        private readonly BrandsRepository _brandsRepository;

        public CatalogController(BrandsRepository brandsRepository)
        {
            _brandsRepository = brandsRepository;
        }

        [HttpGet("api/catalog")]
        public ActionResult<List<Brand>> GetAllBrands()
        {
            var brands = _brandsRepository.GetAll().ToList();
            
            if (brands == null)
            {
                return NotFound();
            
            }
            return Ok(brands);
        }

        [HttpPost("api/catalog")]
        [Authorize(Roles="Admin")]
        public ActionResult AddBrand(Brand brand)
        {
            if (brand == null)
            {
                throw new ArgumentNullException(nameof(brand));
            }

            _brandsRepository.Create(brand);
            return Ok();
        }

        [HttpDelete("api/catalog")]
        public ActionResult<bool> DeleteBrand(Guid id)
        {
            var result = _brandsRepository.Delete(id);

            if (result == true)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
