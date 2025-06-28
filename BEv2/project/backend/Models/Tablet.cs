using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Tablet
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string ModelNumber { get; set; } = string.Empty;

        public string? Dies { get; set; }

        [Required]
        public float MaxPressure { get; set; }

        [Required]
        public float MaxTabletDiameterMM { get; set; }

        [Required]
        public float MaxDepthOfFillMM { get; set; }

        public string? ProductionCapacity { get; set; }

        public string? MachineSize { get; set; }

        [Required]
        public float NetWeightKG { get; set; }

        public string? Avatar { get; set; }

        [Required]
        public decimal Price { get; set; }
    }
}
