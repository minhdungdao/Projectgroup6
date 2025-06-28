using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class LiquidFilling
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string ModelName { get; set; } = string.Empty;

        [Required]
        public float AirPressure { get; set; }

        [Required]
        public float AirVolume { get; set; }

        [Required]
        public float FillingSpeedBPM { get; set; }

        [Required]
        public string FillingRangeML { get; set; } = string.Empty;

        [Required]
        public string Avatar { get; set; } = string.Empty;

        [Required]
        public decimal Price { get; set; }
    }
}
