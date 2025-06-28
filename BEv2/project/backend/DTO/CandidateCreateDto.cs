using backend.Models;
using System.ComponentModel.DataAnnotations;

namespace backend.DTO
{
    public class CandidateCreateDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public IFormFile? Avatar { get; set; }

        public UserRole Role { get; set; } = UserRole.Candidate; // ✅ mặc định là Candidate
    }

}


