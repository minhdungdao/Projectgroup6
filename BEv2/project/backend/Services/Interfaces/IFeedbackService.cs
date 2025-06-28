using backend.Dtos.Feedback;
using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IFeedbackService
    {
        Task<IEnumerable<Feedback>> GetAllAsync();
        Task<Feedback?> GetByIdAsync(int id);
        Task<Feedback> CreateAsync(CreateFeedbackDto dto);

        // ✅ Thêm method phản hồi lại feedback
        Task<Feedback?> ReplyToFeedbackAsync(int id, string reply);
        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<Feedback>> GetPublicAsync(); // Chỉ feedback đã duyệt
        Task<Feedback?> ToggleVisibilityAsync(int id);

    }
}
