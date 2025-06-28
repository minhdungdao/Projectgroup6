//using Microsoft.AspNetCore.Hosting;
//using Microsoft.EntityFrameworkCore;
//using System.Text;
//using BCrypt.Net;
//using backend.Models;
//using backend.Services.Interfaces;

//public class AdminService : IAdminService
//{
//    private readonly AppDbContext _context;
//    private readonly IWebHostEnvironment _env;

//    public AdminService(AppDbContext context, IWebHostEnvironment env)
//    {
//        _context = context;
//        _env = env;
//    }

//    public async Task<IEnumerable<Admin>> GetAllAsync()
//    {
//        return await _context.Admins.ToListAsync();
//    }

//    public async Task<Admin?> GetByIdAsync(int id)
//    {
//        return await _context.Admins.FindAsync(id);
//    }

//    public async Task<Admin> CreateAsync(AdminCreateDto dto)
//    {
//        // Kiểm tra email đã tồn tại chưa
//        if (await _context.Admins.AnyAsync(a => a.Email == dto.Email))
//            throw new Exception("Email already exists.");

//        string? avatarPath = null;

//        if (dto.Avatar != null && dto.Avatar.Length > 0)
//        {
//            var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads", "admins");
//            if (!Directory.Exists(uploadsFolder))
//                Directory.CreateDirectory(uploadsFolder);

//            var uniqueFileName = Guid.NewGuid() + Path.GetExtension(dto.Avatar.FileName);
//            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

//            using (var fileStream = new FileStream(filePath, FileMode.Create))
//            {
//                await dto.Avatar.CopyToAsync(fileStream);
//            }

//            avatarPath = "/uploads/admins/" + uniqueFileName;
//        }

//        var admin = new Admin
//        {
//            Email = dto.Email,
//            Username = dto.Username,
//            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
//            Avatar = avatarPath
//        };

//        _context.Admins.Add(admin);
//        await _context.SaveChangesAsync();

//        return admin;
//    }

//    public async Task<bool> DeleteAsync(int id)
//    {
//        var admin = await _context.Admins.FindAsync(id);
//        if (admin == null) return false;

//        _context.Admins.Remove(admin);
//        await _context.SaveChangesAsync();
//        return true;
//    }
//}
