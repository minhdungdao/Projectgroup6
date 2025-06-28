namespace backend.DTO
{
    public class JobDto
    {
        public int Id { get; set; }
        public string NameJob { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }

        public bool IsDeleted { get; set; }
    }
}
