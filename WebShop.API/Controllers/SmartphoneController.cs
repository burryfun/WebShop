using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using WebShop.API.Helpers;
using WebShop.Domain;
using WebShop.Persistence.Repositories;

namespace WebShop.API.Controllers
{
    public class SmartphoneController : ControllerBase
    {
        private readonly SmartphonesRepository _smartphonesRepository;

        public SmartphoneController(SmartphonesRepository repository)
        {
            _smartphonesRepository = repository;
        }

        [HttpGet("api/smartphones")]
        public async Task<ActionResult<List<Smartphone>>> GetSmartphones([FromQuery] QueryParameters queryParameters)
        {
            var sortedSmartphones = GetSortedSmartphones(queryParameters.SortBy);

            var smartphones = await PaginatedList<Smartphone>.CreateAsync(
                sortedSmartphones, 
                queryParameters.PageNumber, 
                queryParameters.PageSize
                );

            var metadata = new
            {
                totalPages = smartphones.TotalPages,
                pageIndex = smartphones.PageIndex,
            };

            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(metadata));

            return Ok(smartphones);
        }

        private IQueryable<Smartphone> GetSortedSmartphones(string? sortBy)
        {
            switch(sortBy)
            {
                case "LowestPrice":
                    return _smartphonesRepository.GetAll().OrderBy(x => x.Price);
                case "HighestPrice":
                    return _smartphonesRepository.GetAll().OrderByDescending(x => x.Price);
                default:
                    return _smartphonesRepository.GetAll().OrderBy(x => x.Name);
            }
        }
    }
}
