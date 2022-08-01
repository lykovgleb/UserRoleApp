using Back.Business.Models;

namespace Back.Business.Interfaces
{
    public interface IUserService
    {
        public Task<IList<UserDTO>> GetUsersAsync();
        public Task<UserDTO> GetUserByIdAsync(int id);
        public Task<UserDTO> AddUserAsync(UserDTO userDTO);
        public Task UpdateUserAsync(UserDTO userDTO);
        public Task DeleteUserAsync(int id);


    }
}
