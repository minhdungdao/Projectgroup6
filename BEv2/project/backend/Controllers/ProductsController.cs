using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/products
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var tablets = await _context.Tablets.ToListAsync();
            var capsules = await _context.Capsules.ToListAsync();
            var liquidFillings = await _context.LiquidFillings.ToListAsync();

            var result = new
            {
                Tablets = tablets,
                Capsules = capsules,
                LiquidFillings = liquidFillings
            };

            return Ok(result);
        }
    }
}
