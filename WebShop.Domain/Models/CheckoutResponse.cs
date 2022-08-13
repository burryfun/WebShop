using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebShop.Domain.Models
{
    public class CheckoutResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public List<Smartphone> Smartphones { get; set; }
    }
}
