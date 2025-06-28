namespace backend.DTOs
{
    public class CreateQuoteDto
    {
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
    }
}
