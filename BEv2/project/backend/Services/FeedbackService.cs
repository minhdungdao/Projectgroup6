using backend.Dtos.Feedback;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class FeedbackService : IFeedbackService
    {
        private readonly AppDbContext _context;

        public FeedbackService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Feedback>> GetAllAsync()
        {
            return await _context.Feedbacks.ToListAsync();
        }

        public async Task<Feedback?> GetByIdAsync(int id)
        {
            return await _context.Feedbacks.FindAsync(id);
        }

        public async Task<IEnumerable<Feedback>> GetPublicAsync()
        {
            return await _context.Feedbacks
                .Where(f => f.IsVisible)
                .OrderByDescending(f => f.CreatedAt)
                .ToListAsync();
        }

        // chỉnh sửa trạng thái feedback
        public async Task<Feedback?> ToggleVisibilityAsync(int id)
        {
            var feedback = await _context.Feedbacks.FindAsync(id);
            if (feedback == null) return null;

            feedback.IsVisible = !feedback.IsVisible; // ✅ Đảo trạng thái
            await _context.SaveChangesAsync();

            return feedback;
        }

        public async Task<Feedback> CreateAsync(CreateFeedbackDto dto)
        {
            var feedback = new Feedback
            {
                Name = dto.Name,
                PhoneNumber = dto.PhoneNumber,
                Email = dto.Email, // ✅ Thêm dòng này
                Comments = dto.Comments,
                CreatedAt = DateTime.UtcNow
            };

            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();
            return feedback;
        }

        public async Task<Feedback?> ReplyToFeedbackAsync(int id, string reply)
        {
            var feedback = await _context.Feedbacks.FindAsync(id);
            if (feedback == null) return null;

            feedback.Reply = reply;
            await _context.SaveChangesAsync();
            return feedback;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var feedback = await _context.Feedbacks.FindAsync(id);
            if (feedback == null) return false;

            _context.Feedbacks.Remove(feedback);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}
