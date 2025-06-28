using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

public class TabletCreateDto
{
    [Required]
    public string ModelNumber { get; set; }

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

    [Required]
    public decimal Price { get; set; }

    public IFormFile? Avatar { get; set; }
}
