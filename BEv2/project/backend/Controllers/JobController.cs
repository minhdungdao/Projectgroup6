using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobController : ControllerBase
    {
        private readonly AppDbContext _context;

        public JobController(AppDbContext context)
        {
            _context = context;
        }


        // create job mới (dùng cho admin)
        [HttpPost("create")]
        public async Task<IActionResult> CreateJob([FromBody] UpdateJobDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var job = new Job
            {
                NameJob = dto.NameJob,
                Description = dto.Description,
                CreatedAt = DateTime.UtcNow, // Tự động cập nhật thời gian tạo
                IsDeleted = false
            };

            _context.Job.Add(job);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Tạo công việc thành công.",
                JobId = job.Id,
                CreatedAt = job.CreatedAt
            });
        }




        // gọi tất cả các job trong bảng ra (dùng cho admin)
        [HttpGet("getall")]
        public async Task<ActionResult<IEnumerable<JobDto>>> GetAllJob()
        {
            var jobs = await _context.Job
                .OrderByDescending(job => job.CreatedAt) // Sắp xếp theo ngày tạo giảm dần
                .Select(job => new JobDto
                {
                    Id = job.Id,
                    NameJob = job.NameJob,
                    Description = job.Description,
                    CreatedAt = job.CreatedAt,
                    IsDeleted = job.IsDeleted,
                })
                .ToListAsync();

            return Ok(jobs);
        }



        // gọi tất cả các job được admin cho hiển thị và sắp xếp từ mới đến cũ (dùng cho user)
        [HttpGet("joball")]
        public async Task<IActionResult> GetAllJobs()
        {
            var jobs = await _context.Job
                .Where(j => !j.IsDeleted) // ✅ chỉ lấy job chưa bị ẩn
                .OrderByDescending(j => j.CreatedAt) // ✅ sắp xếp mới nhất trước
                .Select(j => new JobDto
                {
                    Id = j.Id,
                    NameJob = j.NameJob,
                    Description = j.Description,
                    CreatedAt = j.CreatedAt,
                    IsDeleted = j.IsDeleted
                })
                .ToListAsync();

            return Ok(jobs); // ✅ trả về danh sách đúng yêu cầu
        }

        // gọi dữ liệu theo id job (user)
        [HttpGet("calljob/{id}")]
        public async Task<ActionResult<JobDto>> GetJob(int id)
        {
            var job = await _context.Job
                .FirstOrDefaultAsync(j => j.Id == id && !j.IsDeleted);

            if (job == null)
            {
                return NotFound();
            }

            var jobDto = new JobDto
            {
                Id = job.Id,
                NameJob = job.NameJob,
                Description = job.Description,
                CreatedAt = job.CreatedAt,
                IsDeleted = job.IsDeleted
            };

            return Ok(jobDto);
        }




        // edit nội dung job  theo id (dùng cho admin)
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> UpdateJob(int id, [FromBody] UpdateJobDto jobDto)
        {
            var job = await _context.Job.FindAsync(id);

            if (job == null)
            {
                return NotFound($"Không tìm thấy công việc với ID = {id}");
            }

            job.NameJob = jobDto.NameJob;
            job.Description = jobDto.Description;

            _context.Job.Update(job);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Cập nhật công việc thành công.",
                job.Id,
                job.NameJob,
                job.Description
            });
        }





        // chỉnh sủa trạng thái ẩn hiện job (dùng cho admin)
        [HttpPut("status/{id}")]
        public async Task<IActionResult> ToggleJobVisibility(int id)
        {
            var job = await _context.Job.FindAsync(id);

            if (job == null)
                return NotFound("Không tìm thấy công việc.");

            job.IsDeleted = !job.IsDeleted; // đảo trạng thái hiện/ẩn
            await _context.SaveChangesAsync();

            var status = job.IsDeleted ? "đã ẩn" : "đã hiện lại";

            return Ok($"Công việc đã được {status}.");
        }





    }
}
