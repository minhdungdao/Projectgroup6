using backend.DTO;
using backend.Dtos.Feedback;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbacksController : ControllerBase
    {
        private readonly IFeedbackService _service;
        private readonly IMemoryCache _cache;

        public FeedbacksController(IFeedbackService service, IMemoryCache cache)
        {
            _service = service;
            _cache = cache;
        }

        // GET api/feedbacks
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var feedbacks = await _service.GetAllAsync();
            return Ok(feedbacks);
        }

        // gọi ra các feedback được duyệt rồi (dùng cho user) 
        [HttpGet("public")]
        public async Task<IActionResult> GetPublicFeedbacks()
        {
            var feedbacks = await _service.GetPublicAsync(); // ✅ Dùng service thay vì _context
            return Ok(feedbacks);
        }


        // GET api/feedbacks/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var feedback = await _service.GetByIdAsync(id);
            if (feedback == null)
                return NotFound($"Feedback with id {id} not found.");

            return Ok(feedback);
        }

        //chỉnh sửa ẩn hiện feedback (dùng cho Admin)
        [HttpPut("{id}/toggle-visibility")]
        public async Task<IActionResult> ToggleVisibility(int id)
        {
            var updated = await _service.ToggleVisibilityAsync(id);
            if (updated == null)
                return NotFound($"Feedback with id {id} not found.");

            return Ok(updated);
        }

        // POST api/feedbacks
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateFeedbackDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // ✅ Lấy IP người dùng
            var ip = HttpContext.Request.Headers["X-Forwarded-For"].FirstOrDefault()
                     ?? HttpContext.Connection.RemoteIpAddress?.ToString();

            if (string.IsNullOrWhiteSpace(ip))
                return BadRequest("Unable to detect IP address.");

            // ✅ Key cache
            var banKey = $"ban:{ip}";
            var countKey = $"count:{ip}";

            // ✅ Nếu IP đang bị block
            if (_cache.TryGetValue(banKey, out _))
            {
                return StatusCode(429, "You are temporarily blocked due to spam. Try again in 15 minutes.");
            }

            // ✅ Tăng lượt đếm
            int count = _cache.Get<int?>(countKey) ?? 0;
            count++;

            if (count > 3)
            {
                // ✅ Chặn IP trong 15 phút
                _cache.Set(banKey, true, TimeSpan.FromMinutes(15));
                return StatusCode(429, "Too many submissions. You are blocked for 15 minutes.");
            }

            // ✅ Ghi lại số lượng mới, có hạn 2 phút
            _cache.Set(countKey, count, TimeSpan.FromMinutes(2));

            // ✅ Gửi feedback như bình thường
            var createdFeedback = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = createdFeedback.Id }, createdFeedback);
        }


        // PUT api/feedbacks/{id}/reply
        [HttpPut("{id}/reply")]
        public async Task<IActionResult> Reply(int id, [FromBody] ReplyFeedbackDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updated = await _service.ReplyToFeedbackAsync(id, dto.Reply);
            if (updated == null)
                return NotFound($"Feedback with id {id} not found.");

            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);
            if (!success)
                return NotFound($"Feedback with id {id} not found.");

            return NoContent();
        }
    }
}
