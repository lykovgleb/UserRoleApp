using AutoMapper;
using Back.Business.Interfaces;
using Back.Business.Models;
using Back.Data;
using Back.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Back.Business.Services
{
    public class RoleService : IRoleService
    {
        private readonly UserRoleContext _userRoleContext;
        private readonly IMapper _mapper;

        public RoleService(UserRoleContext userRoleContext, IMapper mapper)
        {
            _userRoleContext = userRoleContext;
            _mapper = mapper;
        }

        public async Task<RoleDTO> AddRoleAsync(RoleDTO roleDTO)
        {
            var role = _mapper.Map<Role>(roleDTO);
            await _userRoleContext.Roles.AddAsync(role);
            await _userRoleContext.SaveChangesAsync();
            return _mapper.Map<RoleDTO>(role);
        }

        public async Task DeleteRoleAsync(Guid id)
        {
            var role = await GetRoleIfExistAsync(id);
            _userRoleContext.Roles.Remove(role);
            await _userRoleContext.SaveChangesAsync();
        }

        public async Task<RoleDTO> GetRoleByIdAsync(Guid id)
        {
            var role = await GetRoleIfExistAsync(id);
            var roleDTO = _mapper.Map<RoleDTO>(role);
            return roleDTO;
        }

        public async Task<IList<RoleDTO>> GetRolesAsync()
        {
            var roles = await _userRoleContext.Roles.ToListAsync();
            var rolesDTO = _mapper.Map<IList<RoleDTO>>(roles);
            return rolesDTO;
        }

        public async Task<RoleDTO> UpdateRoleAsync(RoleDTO roleDTO)
        {
            await DeleteRoleAsync(roleDTO.Id);
            return _mapper.Map<RoleDTO>(await AddRoleAsync(roleDTO));
        }

        private async Task<Role> GetRoleIfExistAsync(Guid id)
        {
            var role = await _userRoleContext.Roles.FindAsync(id);
            if (role == null)
                throw new Exception("The Role has not been found");
            return role;
        }
    }
}
