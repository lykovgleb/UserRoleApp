using AutoMapper;
using Back.Business.Models;
using Back.Data.Entities;
using Back.Data.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Back.Data.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly UserRoleContext _db;
        private readonly IMapper _mapper;

        public UserRepository(UserRoleContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<UserDTO> CreateAsync(UserDTO userDTO)
        {
            var user = new User()
            {
                Name = userDTO.UserName,
                Id = userDTO.UserId
            };
            foreach (var role in userDTO.UserRoles)
            {
                var roleToAdd = await GetRoleIfExistAsync(role.Id);
                user.Roles.Add(roleToAdd);
            };
            await _db.Users.AddAsync(user);
            return _mapper.Map<UserDTO>(user);
        }

        public async Task DeleteAsync(Guid id)
        {
            var user = await GetUserIfExistAsync(id);
            _db.Users.Remove(user);
        }

        public async Task<IList<UserDTO>> GetAllAsync()
        {
            var users = await _db.Users.Include(c => c.Roles).ToListAsync();
            var usersDTO = _mapper.Map<IList<UserDTO>>(users);
            return usersDTO;
        }

        public async Task<UserDTO> GetByIdAsync(Guid id)
        {
            var user = await GetUserIfExistAsync(id);
            var userDTO = _mapper.Map<UserDTO>(user);
            return userDTO;
        }

        public async Task SaveAsync()
        {
            await _db.SaveChangesAsync();
        }

        public async Task<UserDTO> UpdateAsync(UserDTO updateUser)
        {
            var user = await GetUserIfExistAsync(updateUser.UserId);
            user.Name = updateUser.UserName;
            user.Roles.Clear();
            foreach (var role in updateUser.UserRoles)
            {
                var roleToAdd = await GetRoleIfExistAsync(role.Id);
                user.Roles.Add(roleToAdd);
            };
            return _mapper.Map<UserDTO>(user);
        }

        private async Task<User> GetUserIfExistAsync(Guid id)
        {
            var user = await _db.Users.Include(c => c.Roles).FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
                throw new Exception("The User has not been found");
            return user;
        }

        private async Task<Role> GetRoleIfExistAsync(Guid id)
        {
            var role = await _db.Roles.FindAsync(id);
            if (role == null)
                throw new Exception("The Role has not been found");
            return role;
        }
    }
}
