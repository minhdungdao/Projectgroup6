// ILiquidFillingService.cs
using backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Services.Interfaces
{
    public interface ILiquidFillingService
    {
        Task<List<LiquidFilling>> GetAllAsync();
        Task<LiquidFilling?> GetByIdAsync(int id);
        Task<LiquidFilling> CreateAsync(LiquidFilling liquidFilling);
        Task<bool> UpdateAsync(int id, LiquidFilling liquidFilling);
        Task<bool> DeleteAsync(int id);
    }
}
