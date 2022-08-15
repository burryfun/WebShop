using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebShop.Domain;
using WebShop.Domain.Dto;
using WebShop.Domain.Models;
using WebShop.Persistence.Repositories;

namespace WebShop.API.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class CartController : ControllerBase
    {

        private readonly SmartphonesRepository _smartphonesRepository;

        public CartController(SmartphonesRepository smartphonesRepository)
        {
            _smartphonesRepository = smartphonesRepository;
        }

        [HttpPost("api/cart")]
        public async Task<IActionResult> GetCart([FromBody] CartRequest request)
        {

            if (request == null)
            {
                return BadRequest();
            }

            List<CartDto> response = new List<CartDto>();

            foreach (var id in request.SmartphonesId)
            {
                var smartphone = _smartphonesRepository.GetBrandAndSmartphoneById(Guid.Parse(id));
                response.Add(smartphone);
            }

            return Ok(response);
        }
    }
}
