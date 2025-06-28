using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.DTO;
using System.Net.Mail;
using System.Net;
namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CandidatesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public CandidatesController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        private CandidateResponseDto MapToDto(Candidate c) => new CandidateResponseDto
        {
            Id = c.Id,
            Email = c.Email,
            FullName = c.FullName,
            Phone = c.Phone,
            Avatar = c.Avatar,
            Role = c.Role,
            CreatedAt = c.CreatedAt,
            UpdatedAt = c.UpdatedAt
        };

        // GET api/candidates
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CandidateResponseDto>>> GetCandidates()
        {
            var candidates = await _context.Candidates.ToListAsync();
            return Ok(candidates.Select(MapToDto));
        }

        // GET api/candidates/id/3  (đổi để tránh xung đột với login)
        [HttpPost("id/{id}/avatar")]
        public async Task<IActionResult> UploadAvatarAndGetCandidate(int id, [FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file selected.");

            var candidate = await _context.Candidates.FindAsync(id);
            if (candidate == null)
                return NotFound("Candidate not found");

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "avatars");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Cập nhật avatar url
            candidate.Avatar = $"/avatars/{uniqueFileName}";
            candidate.UpdatedAt = DateTime.UtcNow;

            _context.Candidates.Update(candidate);
            await _context.SaveChangesAsync();

            // Trả về toàn bộ thông tin candidate trừ password
            var result = new
            {
                candidate.Id,
                candidate.Email,
                candidate.FullName,
                candidate.Phone,
                candidate.Avatar,
                candidate.Role,
                candidate.CreatedAt,
                candidate.UpdatedAt
            };

            return Ok(result);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] CandidateCreateDto dto)
        {
            if (await _context.Candidates.AnyAsync(x => x.Email == dto.Email))
                return BadRequest("Email already exists");

            if (dto.Role == UserRole.Admin)
            {
                // Đếm số lượng Admin hiện có trong DB
                int adminCount = await _context.Candidates.CountAsync(c => c.Role == UserRole.Admin);

                // Nếu chưa đủ 2 Admin, cho tạo luôn
                if (adminCount < 2)
                {
                    // cho phép tạo tài khoản admin mà không cần đăng nhập
                }
                else
                {
                    // Nếu đã đủ 2 Admin thì phải đăng nhập và có Role Admin mới được tạo thêm Admin
                    if (!User.Identity.IsAuthenticated)
                    {
                        return Unauthorized("Bạn phải đăng nhập để tạo tài khoản Admin.");
                    }

                    var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                    if (userRole != UserRole.Admin.ToString())
                    {
                        return Forbid("Chỉ Admin mới được phép tạo tài khoản Admin.");
                    }
                }
            }

            // Tạo tài khoản bình thường
            var candidate = new Candidate
            {
                Email = dto.Email,
                FullName = dto.FullName,
                Phone = dto.Phone,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = dto.Role,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            // Xử lý avatar nếu có
            if (dto.Avatar != null && dto.Avatar.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "avatars");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var avatarFileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.Avatar.FileName);
                var filePath = Path.Combine(uploadsFolder, avatarFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.Avatar.CopyToAsync(stream);
                }

                candidate.Avatar = avatarFileName;
            }

            _context.Candidates.Add(candidate);
            await _context.SaveChangesAsync();

            var response = new CandidateResponseDto
            {
                Id = candidate.Id,
                Email = candidate.Email,
                FullName = candidate.FullName,
                Phone = candidate.Phone,
                Avatar = candidate.Avatar,
                Role = candidate.Role,
                CreatedAt = candidate.CreatedAt,
                UpdatedAt = candidate.UpdatedAt
            };

            return Ok(new
            {
                message = "Đăng ký thành công",
                data = response
            });
        }


        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] CandidateForgotPasswordRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var candidate = await _context.Candidates.FirstOrDefaultAsync(c => c.Email == request.Email);
            if (candidate == null)
            {
                return NotFound(new { message = "Email không tồn tại trong hệ thống." });
            }

            // ⏱️ Tạo mã xác thực 6 chữ số và thời gian hết hạn sau 2 phút
            var code = new Random().Next(100000, 999999).ToString();
            var expiration = DateTime.UtcNow.AddMinutes(2);

            candidate.ResetCode = code;
            candidate.ResetCodeExpiration = expiration;
            await _context.SaveChangesAsync();

            // 📨 Chuẩn bị nội dung HTML cho email
            var mailBody = $@"
        <div style='font-family: Arial, sans-serif; padding: 20px; background-color: #f8f8f8;'>
            <h2 style='color: #333;'>🔐 Password Reset Verification Request</h2>
            <p>Hello <strong>{candidate.FullName}</strong>,</p>
            <p>You (or someone else) just requested a password reset verification for the account registered with the email <strong>{request.Email}</strong>.</p>
            <p style='margin-top: 20px; font-size: 18px;'>💡 <strong>Your verification code is:</strong></p>
            <div style='font-size: 24px; font-weight: bold; color: #007bff; background-color: #e9ecef; padding: 10px; display: inline-block; border-radius: 5px;'>
                {code}
            </div>
            <p style='margin-top: 20px;'>⏳ This code will expire <strong>2 minutes</strong> after receiving this email (<em>before {expiration.AddHours(7):HH:mm:ss dd/MM/yyyy}</em> VN time).</p>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p style='margin-top: 30px; font-size: 12px; color: #777;'>Best regards,<br>Taskable AI System</p>
        </div>
    ";

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("ngomanhtien2004@gmail.com", "whwhwcqtmnstygfx"),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress("ngomanhtien2004@gmail.com"),
                Subject = "🔐 Password Reset Verification Code – Recruitment System",
                Body = mailBody,
                IsBodyHtml = true, // ✔️ Cho phép gửi HTML
            };
            mailMessage.To.Add(request.Email);

            await smtpClient.SendMailAsync(mailMessage);

            return Ok(new { message = "✅ Mã xác thực đã được gửi về email của bạn. Vui lòng kiểm tra hộp thư trong vòng 2 phút." });
        }


        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] DTO.ResetPasswordRequest model)
        {
            var candidate = await _context.Candidates.FirstOrDefaultAsync(c =>
                c.Email == model.Email &&
                c.ResetCode == model.Code &&
                c.ResetCodeExpiration >= DateTime.UtcNow
            );

            if (candidate == null)
            {
                return BadRequest(new { message = "Mã xác thực không hợp lệ hoặc đã hết hạn." });
            }

            candidate.Password = BCrypt.Net.BCrypt.HashPassword(model.NewPassword);
            candidate.ResetCode = null;
            candidate.ResetCodeExpiration = null;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Mật khẩu của bạn đã được cập nhật thành công." });
        }



        // POST api/candidates/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
                return BadRequest("Email và Password không được để trống.");

            var user = await _context.Candidates
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
                return Unauthorized("Email hoặc mật khẩu không đúng.");

            var claims = new[]
            {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Name, user.FullName),
        new Claim(ClaimTypes.Role, user.Role.ToString())  // Candidate hoặc Admin
    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.UtcNow.AddDays(7);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new
            {
                token = tokenString,
                id = user.Id,
                email = user.Email,
                fullName = user.FullName,
                role = user.Role.ToString(),
                phone = user.Phone,
                createat = user.CreatedAt,
            });
        }
    }




    // Dto chỉ public info (không có id)
    public class CandidatePublicDto
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
    }

    // Dto trả về khi lấy full candidate info
    public class CandidateResponseDto
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string? Avatar { get; set; }
        public UserRole Role { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class LoginRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
