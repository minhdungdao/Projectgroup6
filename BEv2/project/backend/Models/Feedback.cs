using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Feedback
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty; // ✅ Thêm trường Email

        [Required]
        public string Comments { get; set; } = string.Empty;

        public string? Reply { get; set; }  // ✅ Trường phản hồi

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public bool IsVisible { get; set; } = false; // Mặc định chưa hiển thị (ẩn)
    }
}
