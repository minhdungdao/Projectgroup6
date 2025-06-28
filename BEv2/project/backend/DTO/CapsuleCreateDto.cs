using System.ComponentModel.DataAnnotations;

namespace backend.DTO
{
    public class CapsuleCreateDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public int Output { get; set; }

        [Required]
        public IFormFile Avatar { get; set; }

        [Required]
        public float CapsuleSize { get; set; }

        [Required]
        public string MachineDimension { get; set; }

        [Required]
        public float ShippingWeight { get; set; }

        [Required]
        public decimal Price { get; set; }
    }

}
