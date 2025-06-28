//using backend.Services.Interfaces;
//using Microsoft.AspNetCore.Mvc;

//[ApiController]
//[Route("api/admins")]
//public class AdminsController : ControllerBase
//{
//    private readonly IAdminService _service;

//    public AdminsController(IAdminService service)
//    {
//        _service = service;
//    }

//    [HttpGet]
//    public async Task<IActionResult> GetAll()
//    {
//        var admins = await _service.GetAllAsync();
//        return Ok(admins);
//    }

//    [HttpGet("{id}")]
//    public async Task<IActionResult> GetById(int id)
//    {
//        var admin = await _service.GetByIdAsync(id);
//        return admin == null ? NotFound() : Ok(admin);
//    }

//    [HttpPost]
//    public async Task<IActionResult> Create([FromForm] AdminCreateDto dto)
//    {
//        if (!ModelState.IsValid)
//            return BadRequest(ModelState);

//        try
//        {
//            var admin = await _service.CreateAsync(dto);
//            return CreatedAtAction(nameof(GetById), new { id = admin.Id }, admin);
//        }
//        catch (Exception ex)
//        {
//            return BadRequest(new { message = ex.Message });
//        }
//    }

//    [HttpDelete("{id}")]
//    public async Task<IActionResult> Delete(int id)
//    {
//        var deleted = await _service.DeleteAsync(id);
//        return deleted ? NoContent() : NotFound();
//    }
//}
