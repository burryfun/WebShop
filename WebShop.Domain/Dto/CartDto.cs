using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebShop.Domain.Dto
{
    public class CartDto
    {
        public Guid SmartphoneId { get; set; }
        public string BrandName { get; set; }
        public string SmartphoneName { get; set; }
        public decimal SmartphoneAmount { get; set; }
    }
}
