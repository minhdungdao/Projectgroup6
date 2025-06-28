using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public enum CVStatus
    {
        Pending,
        Approved,
        Rejected
    }

    public class CVSubmission
    {
        [Key]
        public int Id { get; set; }

        public int CandidateId { get; set; }
        public Candidate Candidate { get; set; }

        public int JobId { get; set; }
        public Job Job { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string CVFilePath { get; set; }

        public CVStatus Status { get; set; } = CVStatus.Pending;

        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;

        // ✅ Ngày giờ hẹn phỏng vấn
        public DateTime? InterviewDate { get; set; }

        // ✅ Xác nhận lịch: true = đã xác nhận, false = chưa xác nhận
        public bool IsInterviewConfirmed { get; set; } = false;
    }
}
