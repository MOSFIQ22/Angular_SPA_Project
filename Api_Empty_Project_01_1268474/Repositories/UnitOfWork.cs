using Microsoft.EntityFrameworkCore;
using WebApi_Project_1268474.Models;
using WebApi_Project_1268474.Repositories.Interfaces;

namespace WebApi_Project_1268474.Repositories
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        CourseDbContext db;
        public UnitOfWork(CourseDbContext db)
        {
            this.db = db;
        }
        public async Task CompleteAsync()
        {
            await db.SaveChangesAsync();
        }

        public void Dispose()
        {
            this.db.Dispose();
        }

        public IGenericRepository<T> GetRepo<T>() where T : class, new()
        {
            return new GenericRepository<T>(this.db);
        }
    }
}
