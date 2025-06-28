using Microsoft.AspNetCore.Http;

namespace backend.Dtos
{
    public class LiquidFillingUpdateDto
    {
        public string ModelName { get; set; }
        public float AirPressure { get; set; }
        public float AirVolume { get; set; }
        public float FillingSpeedBPM { get; set; }
        public string FillingRangeML { get; set; }
        public IFormFile? Avatar { get; set; }  // Không required
        public decimal Price { get; set; }
    }
}
