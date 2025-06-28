using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Capsule
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;

        [Required]
        public int Output { get; set; }

        [Required]
        public string Avatar { get; set; } = null!;

        [Required]
        public float CapsuleSize { get; set; }

        [Required]
        public string MachineDimension { get; set; } = null!;

        [Required]
        public float ShippingWeight { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
    }
}
