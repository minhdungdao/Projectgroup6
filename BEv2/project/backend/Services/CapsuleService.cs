using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using backend.Dtos;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class CapsuleService : ICapsuleService
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public CapsuleService(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public async Task<List<Capsule>> GetAllAsync()
        {
            return await _context.Capsules.ToListAsync();
        }

        public async Task<Capsule?> GetByIdAsync(int id)
        {
            return await _context.Capsules.FindAsync(id);
        }

        public async Task<Capsule> CreateAsync(Capsule capsule)
        {
            _context.Capsules.Add(capsule);
            await _context.SaveChangesAsync();
            return capsule;
        }

        public async Task<bool> UpdateAsync(int id, CapsuleUpdateDto dto)
        {
            var existCapsule = await _context.Capsules.FindAsync(id);
            if (existCapsule == null) return false;

            existCapsule.Name = dto.Name;
            existCapsule.Output = dto.Output;
            existCapsule.CapsuleSize = dto.CapsuleSize;
            existCapsule.MachineDimension = dto.MachineDimension;
            existCapsule.ShippingWeight = dto.ShippingWeight;
            existCapsule.Price = dto.Price;

            if (dto.AvatarFile != null && dto.AvatarFile.Length > 0)
            {
                var uploadsDir = Path.Combine(_env.WebRootPath, "uploads", "capsules");
                Directory.CreateDirectory(uploadsDir);

                var fileName = $"{Guid.NewGuid()}_{dto.AvatarFile.FileName}";
                var filePath = Path.Combine(uploadsDir, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.AvatarFile.CopyToAsync(stream);
                }

                existCapsule.Avatar = $"/uploads/capsules/{fileName}";
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var capsule = await _context.Capsules.FindAsync(id);
            if (capsule == null) return false;

            _context.Capsules.Remove(capsule);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
