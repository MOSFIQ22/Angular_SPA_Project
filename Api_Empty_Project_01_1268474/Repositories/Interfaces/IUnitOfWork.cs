namespace WebApi_Project_1268474.Repositories.Interfaces
{
    public interface IUnitOfWork
    {
        IGenericRepository<T> GetRepo<T>() where T : class, new();
        Task CompleteAsync();
        void Dispose();
    }
}
