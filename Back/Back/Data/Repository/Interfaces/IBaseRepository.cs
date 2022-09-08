namespace Back.Data.Repository.Interfaces
{
    public interface IBaseRepository<T>
    {
        public Task<T> GetByIdAsync(Guid id);
        public Task<IList<T>> GetAllAsync();
        public Task<T> UpdateAsync(T item);
        public Task DeleteAsync(Guid id);
        public Task<T> CreateAsync(T item);
        public Task SaveAsync();
    }
}
