using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using WebShop.API.Helpers;
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
        public async Task<ActionResult<List<Smartphone>>> GetSmartphonesByBrand(string brandName, [FromQuery] PageParameters pageParameters)
        {
            var brand = _brandsRepository.GetByName(brandName);

            if (brand == null)
            {
                return NotFound();
            }

            var validParameters = new PageParameters(pageParameters.PageNumber, pageParameters.PageSize);

            var smartphonesByBrandId = _smartphonesRepository.GetAllByBrandId(brand.Id);

            var smartphones = await PaginatedList<Smartphone>.CreateAsync(smartphonesByBrandId, validParameters.PageNumber, validParameters.PageSize);

            var metadata = new
            {
                totalPages = smartphones.TotalPages,
                pageIndex = smartphones.PageIndex,
            };

            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(metadata));

            return Ok(smartphones);
        }

        [HttpPost("/api/catalog/{brandName}")]
        public ActionResult AddSmartphoneToBrand(string brandName, [FromBody] Smartphone smartphone)
        {
            var brand = _brandsRepository.GetByName(brandName.ToLower());

            if (brand == null)
            {
                return BadRequest();
            }

            _smartphonesRepository.Create(
                new Smartphone()
                {
                    Id = smartphone.Id,
                    Name = smartphone.Name,
                    Description = smartphone.Description,
                    Price = smartphone.Price,
                    Discount = smartphone.Discount,
                    Amount = smartphone.Price * (1 - (decimal)smartphone.Discount / 100),
                    BrandId = brand.Id
                });

            return Ok();
        }

        [HttpPut("api/catalog/{brandName}")]
        public ActionResult UpdateSmartphone(string brandName, [FromBody] Smartphone smartphone)
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
            changedSmartphone.Discount = smartphone.Discount;
            changedSmartphone.Amount = smartphone.Price * (1 - (decimal)smartphone.Discount / 100);

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
