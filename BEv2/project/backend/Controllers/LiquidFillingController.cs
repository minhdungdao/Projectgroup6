using backend.Dtos;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LiquidFillingController : ControllerBase
    {
        private readonly ILiquidFillingService _service;
        private readonly IWebHostEnvironment _env;

        public LiquidFillingController(ILiquidFillingService service, IWebHostEnvironment env)
        {
            _service = service;
            _env = env;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _service.GetAllAsync();
            return Ok(items);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] LiquidFillingCreateDto dto)
        {
            var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
            Directory.CreateDirectory(uploadsFolder);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.Avatar.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await dto.Avatar.CopyToAsync(stream);
            }

            var model = new LiquidFilling
            {
                ModelName = dto.ModelName,
                AirPressure = dto.AirPressure,
                AirVolume = dto.AirVolume,
                FillingSpeedBPM = dto.FillingSpeedBPM,
                FillingRangeML = dto.FillingRangeML,
                Avatar = $"/uploads/{fileName}",
                Price = dto.Price
            };

            var created = await _service.CreateAsync(model);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] LiquidFillingUpdateDto dto)
        {
            var existing = await _service.GetByIdAsync(id);
            if (existing == null)
                return NotFound(new { message = "LiquidFilling not found." });

            if (dto.Avatar != null && dto.Avatar.Length > 0)
            {
                var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
                Directory.CreateDirectory(uploadsFolder);

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.Avatar.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.Avatar.CopyToAsync(stream);
                }

                // Xóa ảnh cũ (nếu có)
                var oldFilePath = Path.Combine(_env.WebRootPath, existing.Avatar?.TrimStart('/').Replace("/", Path.DirectorySeparatorChar.ToString()));
                if (System.IO.File.Exists(oldFilePath))
                    System.IO.File.Delete(oldFilePath);

                existing.Avatar = $"/uploads/{fileName}";
            }

            existing.ModelName = dto.ModelName;
            existing.AirPressure = dto.AirPressure;
            existing.AirVolume = dto.AirVolume;
            existing.FillingSpeedBPM = dto.FillingSpeedBPM;
            existing.FillingRangeML = dto.FillingRangeML;
            existing.Price = dto.Price;

            await _service.UpdateAsync(id, existing); // ✅ đúng chữ ký hàm
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _service.GetByIdAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }
    }
}
