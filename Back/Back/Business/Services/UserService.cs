using AutoMapper;
using Back.Business.Interfaces;
using Back.Business.Models;
using Back.Data;
using Back.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Back.Business.Services
{
    public class UserService : IUserService
    {
        private readonly UserRoleContext _userRoleContext;
        private readonly IMapper _mapper;

        public UserService(UserRoleContext userRoleContext, IMapper mapper)
        {
            _userRoleContext = userRoleContext;
            _mapper = mapper;
        }

        public async Task AddUserAsync(UserDTO userDTO)
        {
            var user = _mapper.Map<User>(userDTO);
            await _userRoleContext.Users.AddAsync(user);
            await _userRoleContext.SaveChangesAsync();
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await GetUserIfExistAsync(id);
            _userRoleContext.Users.Remove(user);
            await _userRoleContext.SaveChangesAsync();
        }

        public async Task<UserDTO> GetUserByIdAsync(int id)
        {
            var user = await GetUserIfExistAsync(id);
            var userDTO = _mapper.Map<UserDTO>(user);
            return userDTO;
        }

        public async Task<IList<UserDTO>> GetUsersAsync()
        {
            var users = await _userRoleContext.Users.ToListAsync();
            var usersDTO = _mapper.Map<IList<UserDTO>>(users);
            return usersDTO;
        }

        public async Task UpdateUserAsync(UserDTO userDTO)
        {
            var user = _mapper.Map<User>(userDTO);
            var oldUser = await GetUserIfExistAsync(user.Id);
            oldUser.Name = user.Name;
            oldUser.Roles = user.Roles;
            await _userRoleContext.SaveChangesAsync();
        }

        private async Task<User> GetUserIfExistAsync(int id)
        {
            var user = await _userRoleContext.Users.FindAsync(id);
            if (user == null)
                throw new Exception("The User has not been found");
            return user;
        }
    }
}
