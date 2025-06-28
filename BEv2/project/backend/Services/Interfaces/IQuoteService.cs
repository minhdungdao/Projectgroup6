using backend.DTOs;
using backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IQuoteService
{
    Task<IEnumerable<Quote>> GetAllAsync();
    Task<Quote?> GetByIdAsync(int id);
    Task<Quote> CreateAsync(CreateQuoteDto dto);
}
