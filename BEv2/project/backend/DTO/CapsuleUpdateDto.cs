using Microsoft.AspNetCore.Http;

namespace backend.Dtos
{
    public class CapsuleUpdateDto
    {
        public string Name { get; set; }
        public int Output { get; set; }
        public float CapsuleSize { get; set; }
        public string MachineDimension { get; set; }
        public float ShippingWeight { get; set; }
        public decimal Price { get; set; }

        public IFormFile? AvatarFile { get; set; }
    }
}
