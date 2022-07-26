//using Microsoft.AspNetCore.Mvc;
//using WebShop.Domain;
//using WebShop.Persistence.Repositories;

//namespace WebShop.API.Controllers
//{
//    public class SmartphoneController : ControllerBase
//    {
//        private readonly SmartphonesRepository _smartphonesRepository;

//        public SmartphoneController(SmartphonesRepository repository)
//        {
//            _smartphonesRepository = repository;
//        }

//        [HttpGet("api/[controller]/catalog")]
//        public ActionResult<List<Smartphone>> GetProducts()
//        {
//            var products = _smartphonesRepository.GetAll().ToList();
//            if (products == null)
//            {
//                return NotFound();
//            }
//            return Ok(products);
//        }

//        [HttpGet("api/[controller]/catalog/{id}")]
//        public ActionResult<List<Smartphone>> GetProductById(int id)
//        {
//            var product = _smartphonesRepository.GetById(id);
//            if (product == null)
//            {
//                return NotFound();
//            }
//            return Ok(product);
//        }

//        [HttpPost("api/[controller]")]
//        public void AddProduct([FromBody] Smartphone product)
//        {
//            _smartphonesRepository.Create(product);
//        }

//        [HttpDelete("api/[controller]/{id}")]
//        public void DeleteProduct(int id)
//        {
//            _smartphonesRepository.Delete(id);
//        }
//    }
//}
