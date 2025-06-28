// TabletService.cs
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Services
{
    public class TabletService : ITabletService
    {
        private readonly AppDbContext _context;

        public TabletService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Tablet>> GetAllAsync()
        {
            return await _context.Tablets.ToListAsync();
        }

        public async Task<Tablet?> GetByIdAsync(int id)
        {
            return await _context.Tablets.FindAsync(id);
        }

        public async Task<Tablet> CreateAsync(Tablet tablet)
        {
            _context.Tablets.Add(tablet);
            await _context.SaveChangesAsync();
            return tablet;
        }

        public async Task<bool> UpdateAsync(int id, Tablet tablet)
        {
            var existing = await _context.Tablets.FindAsync(id);
            if (existing == null) return false;

            // Update fields
            existing.ModelNumber = tablet.ModelNumber;
            existing.Dies = tablet.Dies;
            existing.MaxPressure = tablet.MaxPressure;
            existing.MaxTabletDiameterMM = tablet.MaxTabletDiameterMM;
            existing.MaxDepthOfFillMM = tablet.MaxDepthOfFillMM;
            existing.ProductionCapacity = tablet.ProductionCapacity;
            existing.MachineSize = tablet.MachineSize;
            existing.NetWeightKG = tablet.NetWeightKG;
            existing.Avatar = tablet.Avatar;
            existing.Price = tablet.Price;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var tablet = await _context.Tablets.FindAsync(id);
            if (tablet == null) return false;

            _context.Tablets.Remove(tablet);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
