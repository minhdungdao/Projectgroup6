using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatisticsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StatisticsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("account-summary")]
        public async Task<IActionResult> GetAccountSummary()
        {
            var totalAccounts = await _context.Candidates.CountAsync();

            var today = DateTime.UtcNow.Date;
            var newAccountsToday = await _context.Candidates
                .Where(c => c.CreatedAt.Date == today)
                .CountAsync();

            return Ok(new
            {
                TotalAccounts = totalAccounts,
                NewAccountsToday = newAccountsToday
            });
        }

        [HttpGet("job-count")]
        public async Task<IActionResult> GetJobCount()
        {
            var totalJobs = await _context.Job
                .Where(j => !j.IsDeleted) // chỉ tính job chưa bị xóa
                .CountAsync();

            return Ok(new
            {
                TotalJobs = totalJobs
            });
        }


        [HttpGet("cv-today")]
        public async Task<IActionResult> GetNewCVsToday()
        {
            var today = DateTime.UtcNow.Date;

            var newCVsToday = await _context.CVSubmissions
                .Where(cv => cv.SubmittedAt.Date == today)
                .CountAsync();

            return Ok(new
            {
                NewCVsToday = newCVsToday
            });
        }


        // biểu đồ 
        [HttpGet("accounts-by-weekdays")]
        public async Task<IActionResult> GetAccountsByWeekdays()
        {
            var startOfWeek = DateTime.UtcNow.Date.AddDays(-(int)DateTime.UtcNow.DayOfWeek + 1); // Thứ 2
            var endOfWeek = startOfWeek.AddDays(7); // CN

            var data = await _context.Candidates
                .Where(c => c.CreatedAt >= startOfWeek && c.CreatedAt < endOfWeek)
                .GroupBy(c => c.CreatedAt.DayOfWeek)
                .Select(g => new
                {
                    DayOfWeek = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            // Chuẩn hóa thứ sang T2-T7-CN và đảm bảo đủ 7 ngày
            var result = Enum.GetValues(typeof(DayOfWeek))
                .Cast<DayOfWeek>()
                .Select(day => new
                {
                    Day = day.ToString(), // có thể đổi thành "T2", "T3", ...
                    Count = data.FirstOrDefault(d => d.DayOfWeek == day)?.Count ?? 0
                });

            return Ok(result);
        }

        // biểu đồ so sánh giữa các tháng
        [HttpGet("accounts-by-month")]
        public async Task<IActionResult> GetAccountsByMonth()
        {
            var currentYear = DateTime.UtcNow.Year;
            var start = new DateTime(currentYear, 1, 1);
            var end = new DateTime(currentYear, 12, 31, 23, 59, 59); // cuối năm

            // Lấy dữ liệu thực tế từ DB
            var data = await _context.Candidates
                .Where(c => c.CreatedAt >= start && c.CreatedAt <= end)
                .GroupBy(c => c.CreatedAt.Month)
                .Select(g => new
                {
                    Month = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            // Khởi tạo 12 tháng với Count = 0 nếu không có
            var result = Enumerable.Range(1, 12)
                .Select(m => new
                {
                    Month = $"{currentYear}-{m:D2}",
                    Count = data.FirstOrDefault(d => d.Month == m)?.Count ?? 0
                })
                .ToList();

            return Ok(result);
        }


    }
}
