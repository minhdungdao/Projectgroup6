using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class CandidateForgotPasswordRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
    }
}
