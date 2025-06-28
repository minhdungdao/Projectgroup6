using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using System;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using backend.DTO;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CVSubmissionController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;
        private readonly EmailSettings _emailSettings;
        private readonly Job job;
        public CVSubmissionController(AppDbContext context, IWebHostEnvironment env, IOptions<EmailSettings> emailOptions)
        {
            _context = context;
            _env = env;
            _emailSettings = emailOptions.Value;
            job = new Job(); 
        }



        // dùng để người dùng nộp cv (dùng cho user)
        [HttpPost("submit")]
        public async Task<IActionResult> SubmitCV([FromForm] CVSubmissionDto dto)
        {
            if (dto.CVFile == null || dto.CVFile.Length == 0)
                return BadRequest("CV file is required.");

            if (!dto.CVFile.FileName.EndsWith(".pdf", StringComparison.OrdinalIgnoreCase))
                return BadRequest("Only PDF files are allowed.");

            // 🔍 Kiểm tra nếu đã nộp CV cho công việc này
            var existing = await _context.CVSubmissions
                .FirstOrDefaultAsync(c => c.CandidateId == dto.CandidateId && c.JobId == dto.JobId);

            if (existing != null)
                return BadRequest("Bạn đã nộp CV cho vị trí này rồi.");

            // 🔍 Lấy Job từ DB để hiển thị tên công việc trong email
            var job = await _context.Job.FindAsync(dto.JobId);
            if (job == null)
                return NotFound("Không tìm thấy công việc.");

            // 📁 Lưu file
            var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads", "cvs");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var fileName = $"{Guid.NewGuid()}.pdf";
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await dto.CVFile.CopyToAsync(stream);
            }

            // 💾 Tạo bản ghi submission
            var submission = new CVSubmission
            {
                CandidateId = dto.CandidateId,
                JobId = dto.JobId,
                Name = dto.Name,
                Email = dto.Email,
                CVFilePath = $"/uploads/cvs/{fileName}",
                Status = CVStatus.Pending,
                SubmittedAt = DateTime.UtcNow
            };

            _context.CVSubmissions.Add(submission);
            await _context.SaveChangesAsync();

            // 📧 Gửi email xác nhận với HTML template đẹp hơn
            try
            {
                var mail = new MailMessage
                {
                    From = new MailAddress(_emailSettings.From, "Công Ty Dược Phẩm ABC"),
                    Subject = "Xác nhận nộp CV thành công",
                    IsBodyHtml = true,
                    Body = $@"
                <html>
                <head>
                    <style>
                        body {{
                            font-family: Arial, sans-serif;
                            background-color: #f9f9f9;
                            margin: 0; padding: 0;
                        }}
                        .container {{
                            max-width: 600px;
                            margin: 30px auto;
                            background-color: #ffffff;
                            border-radius: 8px;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                            padding: 20px;
                        }}
                        .header {{
                            text-align: center;
                            padding-bottom: 20px;
                            border-bottom: 1px solid #eee;
                        }}
                        .header img {{
                            max-width: 120px;
                        }}
                        .content {{
                            padding: 20px 0;
                            color: #333;
                            font-size: 16px;
                            line-height: 1.5;
                        }}
                        .button {{
                            display: inline-block;
                            padding: 12px 25px;
                            background-color: #007bff;
                            color: #fff !important;
                            text-decoration: none;
                            border-radius: 5px;
                            margin-top: 20px;
                        }}
                        .footer {{
                            font-size: 12px;
                            color: #999;
                            text-align: center;
                            padding-top: 20px;
                            border-top: 1px solid #eee;
                        }}
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <div class='header'>
                            <img src='https://upload.wikimedia.org/wikipedia/vi/thumb/2/2d/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_FPT.svg/1074px-Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_FPT.svg.png?20240228115915' alt='Logo Công Ty Dược Phẩm ABC' />
                        </div>
                        <div class='content'>
                            <p>Hi <strong>{dto.Name}</strong>,</p>
                            <p>Your CV has been successfully submitted for the position of <strong>{job.NameJob}</strong>.</p>
                            <p>Our recruiter will contact you via email as soon as your CV is shortlisted.</p>
                            <p>Good luck!</p>
                            <a href='http://localhost:3000/career' class='button'>Explore more job opportunities</a>
                        </div>
                        <div class='footer'>
                            <p>ABC Pharmaceutical Company</p>
                            <p>Address: Hoa Lac, Thach Hoa, Thach That, Hanoi</p>
                            <p>Email: contact@vitapharma.com | Phone: 0123 456 789</p>
                        </div>
                    </div>
                </body>
                </html>"
                };
                mail.To.Add(dto.Email);

                using var smtp = new SmtpClient(_emailSettings.SmtpServer, _emailSettings.Port)
                {
                    Credentials = new NetworkCredential(_emailSettings.Username, _emailSettings.Password),
                    EnableSsl = true
                };
                await smtp.SendMailAsync(mail);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Gửi email thất bại: {ex.Message}");
            }

            // 📧 Gửi email thông báo cho admin
            try
            {
                var adminMail = new MailMessage
                {
                    From = new MailAddress(_emailSettings.From, "Recruitment Website"),
                    Subject = "📥 A new candidate has submitted a CV",
                    IsBodyHtml = true,
                    Body = $@"
                        <html>
                        <body style='font-family: Arial, sans-serif;'>
                            <p>Candidate <strong>{dto.Name}</strong> has just submitted a CV for the position of <strong>{job.NameJob}</strong>.</p>
                            <p>Candidate's email: {dto.Email}</p>
                            <p>Submission time: {DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm")} UTC</p>
                            <p>🔗 <a href='http://localhost:3000/careerapplicants/{dto.JobId}'>View details in admin panel</a></p>
                        </body>
                        </html>"
                };
                adminMail.To.Add("ngomanhtien2004@gmail.com"); // Địa chỉ email admin

                using var smtpAdmin = new SmtpClient(_emailSettings.SmtpServer, _emailSettings.Port)
                {
                    Credentials = new NetworkCredential(_emailSettings.Username, _emailSettings.Password),
                    EnableSsl = true
                };

                await smtpAdmin.SendMailAsync(adminMail);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Gửi email cho admin thất bại: {ex.Message}");
            }


            return Ok(new
            {
                message = "CV submitted successfully!",
                submissionId = submission.Id,
            });
        }





        //gọi tất cả các cv của người dùng có trong bảng ra (dùng cho admin) 
        [HttpGet("getall")]
        public async Task<IActionResult> GetAllCVs()
        {
            var submissions = await _context.CVSubmissions
                .Select(c => new
                {
                    c.Id,
                    c.CandidateId,
                    c.JobId, // sửa để lấy jobname
                    JobName = c.Job.NameJob,
                    c.Name,
                    c.Email,
                    c.CVFilePath,
                    c.Status,
                    c.SubmittedAt
                })
                .ToListAsync();

            return Ok(submissions);
        }



        // xem chi tiết cv theo Id của cv đó (dùng cho admin)
        [HttpGet("view/{id}")]
        public async Task<IActionResult> ViewCV(int id)
        {
            var submission = await _context.CVSubmissions.FindAsync(id);
            if (submission == null)
                return NotFound();

            var filePath = Path.Combine(_env.WebRootPath, submission.CVFilePath.TrimStart('/'));

            if (!System.IO.File.Exists(filePath))
                return NotFound("File not found.");

            var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            return File(stream, "application/pdf");
        }





        // gọi dữ liệu cv theo id người dùng (dùng cho user)
        [HttpGet("candidate/{candidateId}")]
        public async Task<IActionResult> GetCVsByCandidateId(int candidateId)
        {
            var cvs = await _context.CVSubmissions
                .Where(cv => cv.CandidateId == candidateId)
                .Include(cv => cv.Job)
                .Select(cv => new CVSubmissionResultDto
                {
                    Id = cv.Id,
                    CandidateId = cv.CandidateId,
                    JobId = cv.JobId,
                    JobName = cv.Job.NameJob, // dùng đúng với model bạn định nghĩa
                    Name = cv.Name,
                    Email = cv.Email,
                    CVFilePath = cv.CVFilePath,
                    Status = cv.Status.ToString(),
                    SubmittedAt = cv.SubmittedAt
                })
                .ToListAsync();

            if (cvs == null || cvs.Count == 0)
                return NotFound("bạn chưa nộp cv cho bất kì vị trí nào");

            return Ok(cvs);
        }




        // chỉnh sửa trạng thái status cv theo id (dùng cho admin) 3 trạng thái hiện tại [Pending = 0 ,Approved = 1, Rejected = 2] gán đúng giá trị 
        [HttpPut("statusud/{id}")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateCVStatusDto dto)
        {
            var submission = await _context.CVSubmissions
                .Include(c => c.Job)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (submission == null)
                return NotFound("CV không tồn tại.");

            if (!Enum.IsDefined(typeof(CVStatus), dto.Status))
                return BadRequest("Trạng thái không hợp lệ.");

            // ❌ Chặn cập nhật nếu không còn ở trạng thái Pending
            if (submission.Status != CVStatus.Pending)
            {
                return BadRequest("CV này đã được xử lý và không thể cập nhật lại trạng thái.");
            }

            // ✅ Nếu chọn Approved thì phải có ngày phỏng vấn
            if (dto.Status == CVStatus.Approved && submission.InterviewDate == null)
            {
                return BadRequest("Vui lòng nhập ngày giờ hẹn phỏng vấn trước khi duyệt CV.");
            }

            submission.Status = dto.Status;
            await _context.SaveChangesAsync();

            // ✅ Gửi email nếu được duyệt
            if (dto.Status == CVStatus.Approved)
            {
                var interviewTimeStr = submission.InterviewDate!.Value.ToString("yyyy-MM-dd HH:mm");
                var confirmUrl = $"https://localhost:5194/api/cvsubmission/{submission.Id}/confirm-interview";

                var body = $@"
            <html>
            <body style='font-family: Arial, sans-serif;'>
                <p>Congratulations <strong>{submission.Name}</strong>,</p>
                <p>Your CV has been approved for the position of <strong>{submission.Job?.NameJob ?? "N/A"}</strong>.</p>
                <p>The interview is scheduled for <strong>{interviewTimeStr}</strong>.</p>
                <p>Please confirm your attendance by clicking the button below:</p>
                <a href='{confirmUrl}' style='
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #28a745;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 50px;
                    font-weight: bold;
                '>Confirm Interview</a>
            </body>
            </html>";

                try
                {
                    var mail = new MailMessage
                    {
                        From = new MailAddress(_emailSettings.From, "ABC Pharmaceutical Company"),
                        Subject = "Congratulations! Your CV has been approved",
                        IsBodyHtml = true,
                        Body = body
                    };

                    mail.To.Add(submission.Email);

                    using var smtp = new SmtpClient(_emailSettings.SmtpServer, _emailSettings.Port)
                    {
                        Credentials = new NetworkCredential(_emailSettings.Username, _emailSettings.Password),
                        EnableSsl = true
                    };

                    await smtp.SendMailAsync(mail);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Lỗi gửi email: {ex.Message}");
                }
            }
            else if (dto.Status == CVStatus.Rejected)
            {
                var body = $@"
                        <html>
                        <body style='font-family: Arial, sans-serif; color: #333;'>
                            <p>Dear <strong>{submission.Name}</strong>,</p>
                            <p>Thank you for your interest in and application for the position of <strong>{submission.Job?.NameJob ?? "N/A"}</strong> at our company.</p>
                            <p>After careful consideration, we regret to inform you that your CV does not meet the requirements for this position at this time.</p>
                            <p>However, we truly appreciate your effort and potential, and we hope to have the opportunity to work together in the future.</p>
                            <p>We wish you the best of luck in your career journey ahead.</p>
                            <p>Sincerely,<br/>HR Department – ABC Pharmaceutical Company</p>    
                        </body>
                        </html>";

                try
                {
                    var mail = new MailMessage
                    {
                        From = new MailAddress(_emailSettings.From, "ABC Pharmaceutical Company"),
                        Subject = "Thank you for your application",
                        IsBodyHtml = true,
                        Body = body
                    };

                    mail.To.Add(submission.Email);

                    using var smtp = new SmtpClient(_emailSettings.SmtpServer, _emailSettings.Port)
                    {
                        Credentials = new NetworkCredential(_emailSettings.Username, _emailSettings.Password),
                        EnableSsl = true
                    };

                    await smtp.SendMailAsync(mail);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Lỗi gửi email từ chối: {ex.Message}");
                }
            }


            return Ok(new { message = "Cập nhật trạng thái thành công.", status = submission.Status });
        }






        // xác nhận tham gia  phỏng vấn (user)
        [HttpGet("{id}/confirm-interview")]
        public async Task<IActionResult> ConfirmInterview(int id)
        {
            var cv = await _context.CVSubmissions.FindAsync(id);
            if (cv == null)
                return NotFound("Không tìm thấy CV.");

            if (cv.IsInterviewConfirmed)
                return BadRequest("The interview schedule has already been confirmed.");

            cv.IsInterviewConfirmed = true;
            await _context.SaveChangesAsync();

            return Content(@"
                    <!DOCTYPE html>
                    <html lang='vi'>
                    <head>
                        <meta charset='UTF-8'>
                        <title>Xác nhận thành công</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background: linear-gradient(to right, #4facfe, #00f2fe);
                                color: #333;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height: 100vh;
                                margin: 0;
                            }
                            .card {
                                background: #fff;
                                padding: 40px;
                                border-radius: 12px;
                                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                                text-align: center;
                            }
                            .card h2 {
                                color: #28a745;
                                margin-bottom: 20px;
                            }
                            .card p {
                                font-size: 16px;
                            }
                            .btn {
                                margin-top: 20px;
                                padding: 10px 20px;
                                background: #28a745;
                                color: white;
                                border: none;
                                border-radius: 8px;
                                cursor: pointer;
                                text-decoration: none;
                            }
                            .btn:hover {
                                background: #218838;
                            }
                        </style>
                    </head>
                    <body>
                        <div class='card'>
                            <h2>You have successfully confirmed your interview attendance!</h2>
                            <p>We will send you the detailed information via email as soon as possible.</p>
                            <a href='' class='btn'>Return to Home Page</a>
                        </div>
                    </body>
                    </html>", "text/html; charset=utf-8");

        }



        // gọi ra các cv có cùng 1 id jobs (dùng cho admin)
        [HttpGet("job/{jobId}")]
        public async Task<IActionResult> GetCVsByJobId(int jobId)
        {
            var cvs = await _context.CVSubmissions
                .Where(cv => cv.JobId == jobId)
                .Include(cv => cv.Job)
                .Select(cv => new CVSubmissionResultDto
                {
                    Id = cv.Id,
                    CandidateId = cv.CandidateId,
                    JobId = cv.JobId,
                    JobName = cv.Job.NameJob,
                    Name = cv.Name,
                    Email = cv.Email,
                    CVFilePath = cv.CVFilePath,
                    Status = cv.Status.ToString(),
                    SubmittedAt = cv.SubmittedAt

                })
                .ToListAsync();

            if (cvs == null || cvs.Count == 0)
                return NotFound("Chưa có CV nào cho vị trí này.");

            return Ok(cvs);
        }


        // chỉnh sửa ngày tháng phỏng vấn (dùng cho admin)
        [HttpPut("{id}/interview-date")]
        public async Task<IActionResult> UpdateInterviewDate(int id, [FromBody] InterviewDateUpdateDto dto)
        {
            var cv = await _context.CVSubmissions.FindAsync(id);
            if (cv == null)
            {
                return NotFound(new { message = "CV không tồn tại." });
            }

            // ✅ Cho phép đặt lịch ở mọi trạng thái (Pending, Approved, Rejected)
            if (dto.InterviewDate < DateTime.UtcNow)
            {
                return BadRequest(new { message = "Không thể đặt lịch trong quá khứ." });
            }

            cv.InterviewDate = dto.InterviewDate;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Đã cập nhật ngày giờ phỏng vấn.",
                cv.Id,
                cv.Name,
                InterviewDate = cv.InterviewDate?.ToString("yyyy-MM-dd HH:mm"),
                Status = cv.Status.ToString()
            });
        }


        // gọi ra các cv của 1 job đã được admin duyệt Approved
        [HttpGet("job/{jobId}/approved")]
        public async Task<IActionResult> GetApprovedCVsByJobId(int jobId)
        {
            var cvs = await _context.CVSubmissions
                .Where(cv => cv.JobId == jobId && cv.Status == CVStatus.Approved)
                .Include(cv => cv.Job)
                .Include(cv => cv.Candidate)
                .Select(cv => new
                {
                    Id = cv.Id,
                    CandidateId = cv.CandidateId,
                    CandidateName = cv.Candidate != null ? cv.Candidate.FullName : "N/A",
                    JobId = cv.JobId,
                    JobName = cv.Job != null ? cv.Job.NameJob : "N/A",
                    Name = cv.Name,
                    Email = cv.Email,
                    CVFilePath = cv.CVFilePath,
                    Status = cv.Status.ToString(),
                    SubmittedAt = cv.SubmittedAt,
                    InterviewDate = cv.InterviewDate,
                    IsInterviewConfirmed = cv.IsInterviewConfirmed
                })
                .ToListAsync();

            if (cvs == null || cvs.Count == 0)
                return NotFound("Chưa có CV nào được duyệt cho vị trí này.");

            return Ok(cvs);
        }



    }

}
