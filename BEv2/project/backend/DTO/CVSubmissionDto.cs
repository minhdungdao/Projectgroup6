namespace backend.DTO
{
    public class CVSubmissionDto
    {
       
            public int CandidateId { get; set; }
            public int JobId { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }
            public IFormFile CVFile { get; set; }
        
    }
}
