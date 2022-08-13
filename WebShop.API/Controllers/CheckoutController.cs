using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebShop.Application.Services;
using WebShop.Domain.Models;

namespace WebShop.API.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class CheckoutController : ControllerBase
    {

        private readonly CartService _cartService;

        public CheckoutController(CartService cartService)
        {
            _cartService = cartService;
        }

        [HttpPost("api/checkout")]
        [Authorize]
        public async Task<IActionResult> Checkout([FromBody] CheckoutRequest request)
        {

            if (request == null)
            {
                var res = new CheckoutResponse { IsSuccess = false, Message = "Request is invalid" };
                return BadRequest(res);
            }

            var refreshToken = Request.Cookies["refresh-token"];
            var response = await _cartService.Checkout(refreshToken, request);

            if (response.IsSuccess == false)
            {
                return Unauthorized(response);
            }

            return Ok(response);
        }
    }
}
