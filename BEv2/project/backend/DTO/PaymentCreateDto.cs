using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class PaymentCreateDto : IValidatableObject
    {
        [Required]
        public int CandidateId { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than 0.")]
        public decimal Amount { get; set; }

        [Required]
        [StringLength(100)]
        public string PaymentMethod { get; set; } = string.Empty;

        public int? CapsuleId { get; set; }
        public int? TabletId { get; set; }
        public int? LiquidFillingId { get; set; }

        // Custom validation: chỉ được điền 1 trong 3 Id sản phẩm
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            int count = 0;
            if (CapsuleId.HasValue) count++;
            if (TabletId.HasValue) count++;
            if (LiquidFillingId.HasValue) count++;

            if (count == 0)
            {
                yield return new ValidationResult(
                    "You must provide exactly one product Id (CapsuleId, TabletId or LiquidFillingId).",
                    new[] { nameof(CapsuleId), nameof(TabletId), nameof(LiquidFillingId) });
            }
            else if (count > 1)
            {
                yield return new ValidationResult(
                    "Only one product Id should be provided among CapsuleId, TabletId, or LiquidFillingId.",
                    new[] { nameof(CapsuleId), nameof(TabletId), nameof(LiquidFillingId) });
            }
        }
    }
}
