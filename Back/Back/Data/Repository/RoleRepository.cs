using AutoMapper;
using Back.Business.Models;
using Back.Data.Entities;
using Back.Data.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Back.Data.Repository
{
    public class RoleRepository : IRoleRepository
    {
        private readonly IMapper _mapper;
        private readonly UserRoleContext _db;
        public RoleRepository(IMapper mapper, UserRoleContext db)
        {
            _mapper = mapper;
            _db = db;
        }

        public async Task<RoleDTO> CreateAsync(RoleDTO roleDTO)
        {
            var role = _mapper.Map<Role>(roleDTO);
            await _db.Roles.AddAsync(role);
            return _mapper.Map<RoleDTO>(role);
        }

        public async Task DeleteAsync(Guid id)
        {
            var role = await GetRoleIfExistAsync(id);
            _db.Roles.Remove(role);
        }

        public async Task<IList<RoleDTO>> GetAllAsync()
        {
            var roles = await _db.Roles.ToListAsync();
            return _mapper.Map<IList<RoleDTO>>(roles);
        }

        public async Task<RoleDTO> GetByIdAsync(Guid id)
        {
            var role = await GetRoleIfExistAsync(id);
            return _mapper.Map<RoleDTO>(role);
        }

        public async Task SaveAsync()
        {
            await _db.SaveChangesAsync();
        }

        public async Task<RoleDTO> UpdateAsync(RoleDTO updateRole)
        {
            var role = await GetRoleIfExistAsync(updateRole.Id);
            role.Name = updateRole.Name;
            return _mapper.Map<RoleDTO>(role);
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
