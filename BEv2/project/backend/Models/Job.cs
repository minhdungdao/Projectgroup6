using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Job
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string NameJob { get; set; } = string.Empty;
        [Required]
        [MaxLength(4000)] // hoặc bỏ nếu muốn dùng nvarchar(max)
        public string Description { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public bool IsDeleted { get; set; } = false;

        // Navigation: nếu bạn muốn lấy danh sách các CV nộp vào job này
        public ICollection<CVSubmission>? CVSubmissions { get; set; }
    }
}
