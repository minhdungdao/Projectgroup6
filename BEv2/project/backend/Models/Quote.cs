using System.ComponentModel.DataAnnotations;

public class Quote
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

    // ❌ Đã xoá liên kết Feedback
    // public int? FeedbackId { get; set; }
    // public Feedback? Feedback { get; set; }
}
