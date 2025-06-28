// LiquidFillingService.cs
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Services
{
    public class LiquidFillingService : ILiquidFillingService
    {
        private readonly AppDbContext _context;

        public LiquidFillingService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<LiquidFilling>> GetAllAsync()
        {
            return await _context.LiquidFillings.ToListAsync();
        }

        public async Task<LiquidFilling?> GetByIdAsync(int id)
        {
            return await _context.LiquidFillings.FindAsync(id);
        }

        public async Task<LiquidFilling> CreateAsync(LiquidFilling liquidFilling)
        {
            _context.LiquidFillings.Add(liquidFilling);
            await _context.SaveChangesAsync();
            return liquidFilling;
        }

        public async Task<bool> UpdateAsync(int id, LiquidFilling liquidFilling)
        {
            var existing = await _context.LiquidFillings.FindAsync(id);
            if (existing == null) return false;

            existing.ModelName = liquidFilling.ModelName;
            existing.AirPressure = liquidFilling.AirPressure;
            existing.AirVolume = liquidFilling.AirVolume;
            existing.FillingSpeedBPM = liquidFilling.FillingSpeedBPM;
            existing.FillingRangeML = liquidFilling.FillingRangeML;
            existing.Avatar = liquidFilling.Avatar;
            existing.Price = liquidFilling.Price;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var item = await _context.LiquidFillings.FindAsync(id);
            if (item == null) return false;

            _context.LiquidFillings.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
