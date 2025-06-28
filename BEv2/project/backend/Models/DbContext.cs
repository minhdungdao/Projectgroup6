using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Candidate> Candidates { get; set; }
        public DbSet<Capsule> Capsules { get; set; }
        public DbSet<Tablet> Tablets { get; set; }
        public DbSet<LiquidFilling> LiquidFillings { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Quote> Quotes { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        //public DbSet<Admin> Admins { get; set; }
        public DbSet<Job> Job { get; set; }
        public DbSet<CVSubmission> CVSubmissions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // **Xóa đoạn cấu hình quan hệ Quote - Feedback để tách hẳn 2 bảng**

            // Cấu hình chuyển đổi enum Role thành string trong Candidate
            modelBuilder.Entity<Candidate>()
                .Property(e => e.Role)
                .HasConversion<string>();

            base.OnModelCreating(modelBuilder);


            /*viết cái này để không bị dính kiểu int khi dùng Enum*/
            modelBuilder.Entity<CVSubmission>()
                .Property(e => e.Status)
                .HasConversion<string>();
        }
    }
}
