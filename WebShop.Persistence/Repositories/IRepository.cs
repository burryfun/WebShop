
namespace WebShop.Persistence.Repositories
{
    public interface IRepository<T>
    {
        T Create(T _object);
        T GetById(Guid id);
        IEnumerable<T> GetAll();
        T Update(T _object);
        bool Delete(Guid id);
    }
}
