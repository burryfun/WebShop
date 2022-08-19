using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebShop.Domain.Dto
{
    public class OrderDto
    {
        public string Phone { get; set; }
        public string Address { get; set; }
        public decimal Total { get; set; }
        public string Created { get; set; }
        public List<Smartphone> Smartphones { get; set; }
    }
}
