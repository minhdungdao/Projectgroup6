namespace backend.DTOs
{
    public class QuoteWithFeedbackDto
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string? CompanyName { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? PostalCode { get; set; }
        public string? Country { get; set; }
        public string EmailAddress { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string? Comments { get; set; }
        public int? FeedbackId { get; set; }
        public FeedbackDto? Feedback { get; set; }
    }

    public class FeedbackDto
    {
        public int Id { get; set; }
        public string? Comments { get; set; }
        // thêm trường khác nếu cần
    }
}
