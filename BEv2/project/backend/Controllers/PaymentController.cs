using backend.Dtos;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _service;

        public PaymentController(IPaymentService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PaymentCreateDto dto)
        {
            if (!ModelState.IsValid)
            {
                // Trả về lỗi validation (bao gồm cả lỗi custom trong IValidatableObject)
                return BadRequest(ModelState);
            }

            try
            {
                var payment = await _service.CreateAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id = payment.Id }, payment);
            }
            catch (Exception ex)
            {
                // Trả lỗi nghiệp vụ (ví dụ Candidate không tồn tại, sản phẩm không tồn tại...)
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var payment = await _service.GetByIdAsync(id);
            if (payment == null)
                return NotFound(new { message = $"Payment with id {id} not found." });

            return Ok(payment);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var payments = await _service.GetAllAsync();
            return Ok(payments);
        }
    }
}
