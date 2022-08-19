using Microsoft.AspNetCore.Mvc;
using WebShop.Domain.Models;
using WebShop.Persistence.Repositories;

namespace WebShop.API.Controllers
{
    public class OrderController : ControllerBase
    {

        private readonly OrdersRepository _ordersRepository;
        private readonly AccountRepository _accountRepository;

        public OrderController(OrdersRepository ordersRepository, AccountRepository accountRepository)
        {
            _ordersRepository = ordersRepository;
            _accountRepository = accountRepository;
        }

        [HttpGet("/api/myorders")]
        [Authorize]
        public async Task<IActionResult> GetMyOrders()
        {
            var refreshToken = Request.Cookies["refresh-token"];
            var account = await _accountRepository.GetByTokenAsync(refreshToken);

            if (account == null)
            {
                return Unauthorized(new {IsSuccess = "false", Message = "Token is invalid" });
            }

            var orders = _ordersRepository.GetAllByAccountId(account.Id);

            return Ok(orders);
        }
    }
}
