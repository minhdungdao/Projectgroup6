using backend.DTOs;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

public class QuoteService : IQuoteService
{
    private readonly AppDbContext _context;

    public QuoteService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Quote>> GetAllAsync()
    {
        return await _context.Quotes.ToListAsync();
    }

    public async Task<Quote?> GetByIdAsync(int id)
    {
        return await _context.Quotes.FindAsync(id);
    }

    public async Task<Quote> CreateAsync(CreateQuoteDto dto)
    {
        var quote = new Quote
        {
            FullName = dto.FullName,
            CompanyName = dto.CompanyName,
            Address = dto.Address,
            City = dto.City,
            State = dto.State,
            PostalCode = dto.PostalCode,
            Country = dto.Country,
            EmailAddress = dto.EmailAddress,
            Phone = dto.Phone,
            Comments = dto.Comments
        };

        _context.Quotes.Add(quote);
        await _context.SaveChangesAsync();

        return quote;
    }
}
