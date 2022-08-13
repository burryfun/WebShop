using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebShop.Domain;
using WebShop.Domain.Models;
using WebShop.Persistence.Repositories;

namespace WebShop.Application.Services
{
    public class CartService
    {

        private readonly AccountRepository _accountRepository;
        private readonly OrdersRepository _ordersRepository;
        private readonly SmartphonesRepository _smartphonesRepository;

        public CartService(
            AccountRepository accountRepository, 
            OrdersRepository ordersRepository,
            SmartphonesRepository smartphonesRepository
            )
        {
            _accountRepository = accountRepository;
            _ordersRepository = ordersRepository;
            _smartphonesRepository = smartphonesRepository;
        }

        public async Task<CheckoutResponse> Checkout(string currentToken, CheckoutRequest request)
        {
            var account = await _accountRepository.GetByTokenAsync(currentToken);
            
            if (account == null)
            {
                return new CheckoutResponse { IsSuccess = false, Message = "Token is invalid"};
            }

            var smartphones = new List<Smartphone>();

            foreach(var id in request.SmartphonesId)
            {
                var smartphone = _smartphonesRepository.GetById(id);
                smartphones.Add(smartphone);
            }

            var order = new Order { 
                Account = account,
                Address = request.Address,
                Created = DateTime.UtcNow,
                Phone = request.Phone,
                Smartphones = smartphones
            };

            _ordersRepository.Create(order);

            return new CheckoutResponse { 
                IsSuccess = true , 
                Message = "Order is processed", 
                Smartphones = smartphones
            };
        }
    }
}
