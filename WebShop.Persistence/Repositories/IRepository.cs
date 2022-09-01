
namespace WebShop.Persistence.Repositories
{
    public interface IRepository<T>
    {
        T Create(T _object);
        T GetById(Guid id);
        IQueryable<T> GetAll();
        T Update(T _object);
        bool Delete(Guid id);
    }
}
