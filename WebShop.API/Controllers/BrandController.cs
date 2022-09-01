using Microsoft.AspNetCore.Mvc;
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
        public async Task<ActionResult<List<Smartphone>>> GetSmartphonesByBrand(
            string brandName,
            [FromQuery] QueryParameters queryParameters
            )
        {
            var brand = _brandsRepository.GetByName(brandName);

            if (brand == null)
            {
                return NotFound();
            }

            var validParameters = new QueryParameters(queryParameters.PageNumber, queryParameters.PageSize);

            IQueryable<Smartphone> sortedSmartphones = GetSortedSmartphonesByBrand(brand.Id, queryParameters.SortBy);

            var smartphones = await PaginatedList<Smartphone>.CreateAsync(
                sortedSmartphones,
                validParameters.PageNumber,
                validParameters.PageSize
                );

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
                    BrandName = smartphone.BrandName,
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

        private IQueryable<Smartphone> GetSortedSmartphonesByBrand(Guid brandId, string? sortBy)
        {
            switch (sortBy)
            {
                case "LowestPrice":
                    return _smartphonesRepository.GetAllByBrandId(brandId).OrderBy(x => x.Price);
                case "HighestPrice":
                    return _smartphonesRepository.GetAllByBrandId(brandId).OrderByDescending(x => x.Price);
                default:
                    return _smartphonesRepository.GetAllByBrandId(brandId).OrderBy(x => x.Name);
            }
        }
    }
}
