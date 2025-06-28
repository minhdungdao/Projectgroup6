// ITabletService.cs
using backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Services.Interfaces
{
    public interface ITabletService
    {
        Task<List<Tablet>> GetAllAsync();
        Task<Tablet?> GetByIdAsync(int id);
        Task<Tablet> CreateAsync(Tablet tablet);
        Task<bool> UpdateAsync(int id, Tablet tablet);
        Task<bool> DeleteAsync(int id);
    }
}
