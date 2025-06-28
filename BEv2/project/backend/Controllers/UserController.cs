//using Microsoft.AspNetCore.Mvc;
//using backend.Models;
//using System.Linq;

//namespace backend.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class UserController : ControllerBase
//    {
//        private readonly AppDbContext _context;

//        public UserController(AppDbContext context)
//        {
//            _context = context;
//        }

//        // POST: api/User/Login
//        [HttpPost("Login")]
//        public IActionResult Login([FromBody] LoginRequest request)
//        {
//            if (request == null || string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
//            {
//                return BadRequest(new { message = "Invalid login request. Please provide both username and password." });
//            }

//            // Check if the user exists in the database
//            var user = _context.Users
//                .FirstOrDefault(u => u.Username == request.Username && u.Password == request.Password);

//            if (user == null)
//            {
//                return Unauthorized(new { message = "Incorrect username or password." });
//            }

//            // Return success message with user details (excluding sensitive information like password)
//            return Ok(new
//            {
//                message = "Login successful.",
//                user = new
//                {
//                    user.Id,
//                    user.Username,
//                    user.Email,
//                    user.Phone,
//                    user.RoleId
//                }
//            });
//        }
//    }

//    // DTO for login request
//    public class LoginRequest
//    {
//        public string Username { get; set; }
//        public string Password { get; set; }
//    }
//}
