using backend.Models;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TabletController : ControllerBase
    {
        private readonly ITabletService _service;
        private readonly IWebHostEnvironment _env;

        public TabletController(ITabletService service, IWebHostEnvironment env)
        {
            _service = service;
            _env = env;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _service.GetAllAsync();
            return Ok(list);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var tablet = await _service.GetByIdAsync(id);
            if (tablet == null) return NotFound();
            return Ok(tablet);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] TabletCreateDto dto)
        {
            // 1. Lưu file avatar nếu có
            string? avatarFileName = null;
            if (dto.Avatar != null && dto.Avatar.Length > 0)
            {
                // Tạo thư mục lưu trữ nếu chưa tồn tại
                var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(uploadFolder))
                    Directory.CreateDirectory(uploadFolder);

                // Đặt tên file unique
                avatarFileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.Avatar.FileName);
                var filePath = Path.Combine(uploadFolder, avatarFileName);

                using var stream = new FileStream(filePath, FileMode.Create);
                await dto.Avatar.CopyToAsync(stream);
            }

            // 2. Tạo đối tượng Tablet từ dto
            var tablet = new Tablet
            {
                ModelNumber = dto.ModelNumber,
                Dies = dto.Dies,
                MaxPressure = dto.MaxPressure,
                MaxTabletDiameterMM = dto.MaxTabletDiameterMM,
                MaxDepthOfFillMM = dto.MaxDepthOfFillMM,
                ProductionCapacity = dto.ProductionCapacity,
                MachineSize = dto.MachineSize,
                NetWeightKG = dto.NetWeightKG,
                Price = dto.Price,
                Avatar = avatarFileName != null ? "/uploads/" + avatarFileName : null
            };

            // 3. Gọi service lưu database
            var created = await _service.CreateAsync(tablet);

            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] TabletCreateDto dto)
        {
            var uploadsFolder = Path.Combine(_env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"), "uploads");
            Directory.CreateDirectory(uploadsFolder);

            string? avatarPath = null;

            if (dto.Avatar != null && dto.Avatar.Length > 0)
            {
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.Avatar.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.Avatar.CopyToAsync(stream);
                }

                avatarPath = $"/uploads/{fileName}";
            }

            var tablet = new Tablet
            {
                ModelNumber = dto.ModelNumber,
                Dies = dto.Dies,
                MaxPressure = dto.MaxPressure,
                MaxTabletDiameterMM = dto.MaxTabletDiameterMM,
                MaxDepthOfFillMM = dto.MaxDepthOfFillMM,
                ProductionCapacity = dto.ProductionCapacity,
                MachineSize = dto.MachineSize,
                NetWeightKG = dto.NetWeightKG,
                Price = dto.Price,
                Avatar = avatarPath // có thể null nếu không upload ảnh mới
            };

            var result = await _service.UpdateAsync(id, tablet);
            if (!result) return NotFound();

            return NoContent();
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.DeleteAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}
