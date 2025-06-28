using backend.Models;
using backend.Services.Interfaces;
using backend.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using DinkToPdf.Contracts;
using DinkToPdf;
using backend;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure AppDbContext with MySQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 31))
    ));

// Swagger cho phát triển
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register your services
builder.Services.AddScoped<ICapsuleService, CapsuleService>();
builder.Services.AddScoped<ITabletService, TabletService>();
builder.Services.AddScoped<ILiquidFillingService, LiquidFillingService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddScoped<IFeedbackService, FeedbackService>();
builder.Services.AddScoped<IQuoteService, QuoteService>();
//builder.Services.AddScoped<IAdminService, AdminService>();
builder.Services.AddMemoryCache();


// CORS: Cho phép truy cập từ MVC (http://localhost:3000)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowMvcOrigin", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials(); // Nếu bạn cần gửi cookie / token
    });
});

// liên quan đến nộp cv
builder.Services.Configure<EmailSettings>(
    builder.Configuration.GetSection("EmailSettings"));




// ** Thêm cấu hình Authentication JWT **
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

builder.Services.AddAuthorization();


// Thêm Authorization
builder.Services.AddAuthorization();

var context = new CustomAssemblyLoadContext();
context.LoadUnmanagedLibrary(Path.Combine(Directory.GetCurrentDirectory(), "DinkToPdf", "libwkhtmltox.dll"));
// xuất ra file pdf
builder.Services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));
var app = builder.Build();

// Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseExceptionHandler("/error");
    app.UseHsts();
}

app.UseHttpsRedirection();

/*cho phép truy cập file tĩnh trong wwwroot*/
app.UseStaticFiles(); // Phục vụ wwwroot

// CORS phải nằm trước authentication và authorization
app.UseCors("AllowMvcOrigin");

// ** Thêm middleware Authentication trước Authorization **
app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();
