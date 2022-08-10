using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebShop.Domain;
using WebShop.Persistence.Repositories;

namespace WebShop.API.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class BrandController : ControllerBase
    {
        private readonly BrandsRepository _brandsRepository;
        private readonly SmartphonesRepository _smartphonesRepository;

        public BrandController(BrandsRepository brandsRepository, SmartphonesRepository smartphonesRepository)
        {
            _brandsRepository = brandsRepository;
            _smartphonesRepository = smartphonesRepository;
        }

        [HttpGet("/api/catalog/{brandName}")]
        public ActionResult<List<Smartphone>> GetSmartphonesByBrand(string brandName)
        {
            var brand = _brandsRepository.GetByName(brandName);

            if (brand == null)
            {
                return NotFound();
            }

            var smartphones = _smartphonesRepository.GetAllByBrandId(brand.Id);

            return Ok(smartphones);
        }

        [HttpPost("/api/catalog/{brandName}")]
        public ActionResult AddSmartphoneToBrand(string brandName, [FromBody]Smartphone smartphone)
        {
            var brand = _brandsRepository.GetByName(brandName.ToLower());

            if (brand == null)
            {
                return BadRequest();
            }

            _smartphonesRepository.Create(
                new Smartphone
                {
                    Id = smartphone.Id,
                    Name = smartphone.Name,
                    Description = smartphone.Description,
                    Price = smartphone.Price,
                    BrandId = brand.Id
                });

            return Ok();
        }

        [HttpPut("api/catalog/{brandName}")]
        public ActionResult UpdateSmartphone(string brandName, Smartphone smartphone)
        {
            var brand = _brandsRepository.GetByName(brandName.ToLower());

            if (brand == null)
            {
                return BadRequest();
            }

            if (smartphone == null)
            {
                return BadRequest();
            }

            var changedSmartphone = _smartphonesRepository.GetById(smartphone.Id);
            
            changedSmartphone.Name = smartphone.Name;
            changedSmartphone.Description = smartphone.Description;
            changedSmartphone.Price = smartphone.Price;

            _smartphonesRepository.Update(changedSmartphone);

            return Ok();
        }

        [HttpDelete("api/catalog/{brandName}")]
        public ActionResult DeleteSmartphoneFromBrand(string brandName, Guid SmartphoneId)
        {
            var brand = _brandsRepository.GetByName(brandName.ToLower());

            if (brand == null)
            {
                return BadRequest();
            }

            var result = _smartphonesRepository.Delete(SmartphoneId);

            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}
