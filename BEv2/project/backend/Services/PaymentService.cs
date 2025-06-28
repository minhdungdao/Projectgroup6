using backend.Dtos;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly AppDbContext _context;

        public PaymentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Payment> CreateAsync(PaymentCreateDto dto)
        {
            // Kiểm tra Candidate tồn tại
            var candidate = await _context.Candidates.FindAsync(dto.CandidateId);
            if (candidate == null)
                throw new Exception("Candidate not found");

            // Kiểm tra chỉ có đúng 1 sản phẩm được chọn
            int productCount = 0;
            if (dto.CapsuleId.HasValue) productCount++;
            if (dto.TabletId.HasValue) productCount++;
            if (dto.LiquidFillingId.HasValue) productCount++;

            if (productCount == 0)
                throw new Exception("You must provide exactly one product Id (CapsuleId, TabletId or LiquidFillingId).");
            if (productCount > 1)
                throw new Exception("Only one product Id should be provided among CapsuleId, TabletId, or LiquidFillingId.");

            var payment = new Payment
            {
                CandidateId = dto.CandidateId,
                Amount = dto.Amount,
                PaymentMethod = dto.PaymentMethod,
                Status = PaymentStatus.Pending,
                PaymentDate = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            // Gán sản phẩm tương ứng
            if (dto.CapsuleId.HasValue)
            {
                var capsule = await _context.Capsules.FindAsync(dto.CapsuleId.Value);
                if (capsule == null)
                    throw new Exception("Capsule not found");
                payment.CapsuleId = capsule.Id;
            }
            else if (dto.TabletId.HasValue)
            {
                var tablet = await _context.Tablets.FindAsync(dto.TabletId.Value);
                if (tablet == null)
                    throw new Exception("Tablet not found");
                payment.TabletId = tablet.Id;
            }
            else if (dto.LiquidFillingId.HasValue)
            {
                var liquid = await _context.LiquidFillings.FindAsync(dto.LiquidFillingId.Value);
                if (liquid == null)
                    throw new Exception("LiquidFilling not found");
                payment.LiquidFillingId = liquid.Id;
            }

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            // Tải lại dữ liệu liên quan để trả về đầy đủ thông tin (nếu cần)
            await _context.Entry(payment).Reference(p => p.Candidate).LoadAsync();
            if (payment.CapsuleId.HasValue)
                await _context.Entry(payment).Reference(p => p.Capsule).LoadAsync();
            if (payment.TabletId.HasValue)
                await _context.Entry(payment).Reference(p => p.Tablet).LoadAsync();
            if (payment.LiquidFillingId.HasValue)
                await _context.Entry(payment).Reference(p => p.LiquidFilling).LoadAsync();

            return payment;
        }

        public async Task<IEnumerable<Payment>> GetAllAsync()
        {
            return await _context.Payments
                .Include(p => p.Candidate)
                .Include(p => p.Capsule)
                .Include(p => p.Tablet)
                .Include(p => p.LiquidFilling)
                .ToListAsync();
        }

        public async Task<Payment?> GetByIdAsync(int id)
        {
            return await _context.Payments
                .Include(p => p.Candidate)
                .Include(p => p.Capsule)
                .Include(p => p.Tablet)
                .Include(p => p.LiquidFilling)
                .FirstOrDefaultAsync(p => p.Id == id);
        }
    }
}
