using backend.Models;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using backend.DTO;
using backend.Dtos;
namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CapsuleController : ControllerBase
    {
        private readonly ICapsuleService _service;

        public CapsuleController(ICapsuleService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var capsule = await _service.GetByIdAsync(id);
            return capsule == null ? NotFound() : Ok(capsule);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CapsuleCreateDto capsuleDto)
        {
            if (capsuleDto.Avatar == null || capsuleDto.Avatar.Length == 0)
                return BadRequest("Avatar file is required.");

            // 1. Lưu file Avatar vào wwwroot/uploads (tạo folder nếu chưa có)
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(capsuleDto.Avatar.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await capsuleDto.Avatar.CopyToAsync(fileStream);
            }

            // 2. Tạo entity Capsule từ DTO và đường dẫn file lưu Avatar
            var capsule = new Capsule
            {
                Name = capsuleDto.Name,
                Output = capsuleDto.Output,
                Avatar = "/uploads/" + uniqueFileName, // đường dẫn relative để frontend dùng
                CapsuleSize = capsuleDto.CapsuleSize,
                MachineDimension = capsuleDto.MachineDimension,
                ShippingWeight = capsuleDto.ShippingWeight,
                Price = capsuleDto.Price
            };

            var created = await _service.CreateAsync(capsule);

            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] CapsuleUpdateDto dto)
        {
            var updated = await _service.UpdateAsync(id, dto);
            if (!updated) return NotFound();
            return NoContent();
        }




        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            return deleted ? NoContent() : NotFound();
        }
    }
}
