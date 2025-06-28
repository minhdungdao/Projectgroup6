namespace backend.DTO
{
    public class CVSubmissionResultDto
    {
        public int Id { get; set; }
        public int CandidateId { get; set; }
        public int JobId { get; set; }
        public string JobName { get; set; }  // Lưu ý: dùng "JobName" vì trong Job là NameJob
        public string Name { get; set; }
        public string Email { get; set; }
        public string CVFilePath { get; set; }
        public string Status { get; set; }
        public DateTime SubmittedAt { get; set; }
    }
}
