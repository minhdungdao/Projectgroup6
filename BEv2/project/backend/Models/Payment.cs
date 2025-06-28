using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public enum PaymentStatus
    {
        Pending,
        Completed,
        Failed
    }

    public class Payment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(Candidate))]
        public int CandidateId { get; set; }

        public Candidate? Candidate { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public DateTime PaymentDate { get; set; } = DateTime.UtcNow;

        [Required]
        public string PaymentMethod { get; set; } = string.Empty;

        [Required]
        public PaymentStatus Status { get; set; } = PaymentStatus.Pending;

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Nullable foreign keys for product types
        [ForeignKey(nameof(Capsule))]
        public int? CapsuleId { get; set; }
        public Capsule? Capsule { get; set; }

        [ForeignKey(nameof(Tablet))]
        public int? TabletId { get; set; }
        public Tablet? Tablet { get; set; }

        [ForeignKey(nameof(LiquidFilling))]
        public int? LiquidFillingId { get; set; }
        public LiquidFilling? LiquidFilling { get; set; }
    }
}
