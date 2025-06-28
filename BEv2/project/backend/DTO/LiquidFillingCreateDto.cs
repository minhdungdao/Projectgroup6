using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class LiquidFillingCreateDto
    {
        [Required]
        public string ModelName { get; set; }

        [Required]
        public float AirPressure { get; set; }

        [Required]
        public float AirVolume { get; set; }

        [Required]
        public float FillingSpeedBPM { get; set; }

        [Required]
        public string FillingRangeML { get; set; }

        [Required]
        public IFormFile Avatar { get; set; }

        [Required]
        public decimal Price { get; set; }
    }
}
