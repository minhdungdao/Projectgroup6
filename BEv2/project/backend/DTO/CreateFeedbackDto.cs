using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Feedback
{
    public class CreateFeedbackDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        public string Comments { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
    }
}
