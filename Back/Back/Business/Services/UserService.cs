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

        public async Task<UserDTO> AddUserAsync(UserDTO userDTO)
        {
            var user = new User()
            {
                Name = userDTO.UserName
            };            
            foreach (var role in userDTO.UserRoles )
            {
                var roleToAdd = await GetRoleIfExistAsync(role.Id);
                user.Roles.Add(roleToAdd);
            }
            await _userRoleContext.Users.AddAsync(user);
            await _userRoleContext.SaveChangesAsync();
            return _mapper.Map<UserDTO>(user);
        }

        public async Task<UserDTO> DeleteUserAsync(int id)
        {
            var user = await GetUserIfExistAsync(id);
            _userRoleContext.Users.Remove(user);
            await _userRoleContext.SaveChangesAsync();
            var userDto = _mapper.Map<UserDTO>(user);
            return userDto;
        }

        public async Task<UserDTO> GetUserByIdAsync(int id)
        {
            var user = await GetUserIfExistAsync(id);
            var userDTO = _mapper.Map<UserDTO>(user);
            return userDTO;
        }

        public async Task<IList<UserDTO>> GetUsersAsync()
        {
            var users = await _userRoleContext.Users.Include(c => c.Roles).ToListAsync();
            var usersDTO = _mapper.Map<IList<UserDTO>>(users);
            return usersDTO;
        }

        public async Task<UserDTO> UpdateUserAsync(UserDTO userDTO)
        {
            var user = _mapper.Map<User>(userDTO);
            var oldUser = await GetUserIfExistAsync(user.Id);
            oldUser.Name = user.Name;
            oldUser.Roles.Clear();
            foreach (var role in userDTO.UserRoles)
            {
                var roleToAdd = await GetRoleIfExistAsync(role.Id);
                oldUser.Roles.Add(roleToAdd);
            }
            await _userRoleContext.SaveChangesAsync();
            var newUserDTO = _mapper.Map<UserDTO>(oldUser);
            return newUserDTO;
        }

        private async Task<User> GetUserIfExistAsync(int id)
        {
            var user = await _userRoleContext.Users.Include(c => c.Roles).FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
                throw new Exception("The User has not been found");
            return user;
        }

        private async Task<Role> GetRoleIfExistAsync(int id)
        {
            var role = await _userRoleContext.Roles.FindAsync(id);
            if (role == null)
                throw new Exception("The Role has not been found");
            return role;
        }
    }
}
