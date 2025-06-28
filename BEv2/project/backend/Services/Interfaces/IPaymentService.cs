// Services/Interfaces/IPaymentService.cs
using backend.Dtos;
using backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Services.Interfaces
{
    public interface IPaymentService
    {
        Task<Payment> CreateAsync(PaymentCreateDto dto);
        Task<IEnumerable<Payment>> GetAllAsync();
        Task<Payment?> GetByIdAsync(int id);
    }
}
