//using backend.DTO;
//using backend.Models;
//using backend.Services.Interfaces;
//using Microsoft.EntityFrameworkCore;

//namespace backend.Services
//{
//    public class ProductService : IProductService
//    {
//        private readonly AppDbContext _context;

//        public ProductService(AppDbContext context)
//        {
//            _context = context;
//        }

//        public async Task<List<ProductDto>> GetAllProductsAsync()
//        {
//            var capsules = await _context.Capsules
//                .Select(x => new ProductDto
//                {
//                    Id = x.Id,
//                    Name = x.Name,
//                    Type = "Capsule"
//                }).ToListAsync();

//            var tablets = await _context.Tablets
//                .Select(x => new ProductDto
//                {
//                    Id = x.Id,
//                    Name = x.Name,
//                    Type = "Tablet"
//                }).ToListAsync();

//            var liquids = await _context.LiquidFillings
//                .Select(x => new ProductDto
//                {
//                    Id = x.Id,
//                    Name = x.Name,
//                    Type = "LiquidFilling"
//                }).ToListAsync();

//            return capsules.Concat(tablets).Concat(liquids).ToList();
//        }
//    }

//}
