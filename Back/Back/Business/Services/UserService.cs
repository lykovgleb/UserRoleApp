using Back.Business.Interfaces;
using Back.Business.Models;
using Back.Data.Repository.Interfaces;

namespace Back.Business.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserDTO> AddUserAsync(UserDTO userDTO)
        {
            var user = await _userRepository.CreateAsync(userDTO);
            await _userRepository.SaveAsync();
            return user;
        }

        public async Task DeleteUserAsync(Guid id)
        {
            await _userRepository.DeleteAsync(id);
            await _userRepository.SaveAsync();
        }

        public async Task<UserDTO> GetUserByIdAsync(Guid id)
        {
            return await _userRepository.GetByIdAsync(id);
        }

        public async Task<IList<UserDTO>> GetUsersAsync()
        {
            return await _userRepository.GetAllAsync();
        }

        public async Task<UserDTO> UpdateUserAsync(UserDTO userDTO)
        {
            var user = await _userRepository.UpdateAsync(userDTO);
            await _userRepository.SaveAsync();
            return user;
        }
    }
}
