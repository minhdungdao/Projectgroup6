//using backend.Repo.Irepo;
//using Microsoft.EntityFrameworkCore;

//namespace backend.Repo
//{
//    public class Repository<T> : IRepository<T> where T : class
//    {
//        private readonly DbContext _context;
//        private readonly DbSet<T> _dbSet;

//        public Repository(DbContext context)
//        {
//            _context = context;
//            _dbSet = context.Set<T>();
//        }

//        public async Task<List<T>> GetAllAsync() => await _dbSet.ToListAsync();
//        public async Task<T?> GetByIdAsync(int id) => await _dbSet.FindAsync(id);
//        public async Task<T> CreateAsync(T entity)
//        {
//            _dbSet.Add(entity);
//            await _context.SaveChangesAsync();
//            return entity;
//        }
//        public async Task<bool> UpdateAsync(int id, T entity)
//        {
//            _context.Entry(entity).State = EntityState.Modified;
//            return await _context.SaveChangesAsync() > 0;
//        }
//        public async Task<bool> DeleteAsync(int id)
//        {
//            var entity = await GetByIdAsync(id);
//            if (entity == null) return false;
//            _dbSet.Remove(entity);
//            return await _context.SaveChangesAsync() > 0;
//        }
//    }

//}
