using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using backend.Dtos;
using Microsoft.AspNetCore.Http;  // để dùng IFormFile trong DTO nếu cần

namespace backend.Services.Interfaces
{
    /// <summary>
    /// Service interface for managing Capsules.
    /// </summary>
    public interface ICapsuleService
    {
        Task<List<Capsule>> GetAllAsync();

        Task<Capsule?> GetByIdAsync(int id);

        Task<Capsule> CreateAsync(Capsule capsule);

        // UpdateAsync nhận DTO chứa dữ liệu cập nhật và file ảnh
        Task<bool> UpdateAsync(int id, CapsuleUpdateDto capsuleUpdateDto);

        Task<bool> DeleteAsync(int id);
    }
}
