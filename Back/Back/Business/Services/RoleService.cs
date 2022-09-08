using Back.Business.Interfaces;
using Back.Business.Models;
using Back.Data.Repository.Interfaces;

namespace Back.Business.Services
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;

        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public async Task<RoleDTO> AddRoleAsync(RoleDTO roleDTO)
        {
            var role = await _roleRepository.CreateAsync(roleDTO);
            await _roleRepository.SaveAsync();
            return role;
        }

        public async Task DeleteRoleAsync(Guid id)
        {
            await _roleRepository.DeleteAsync(id);
            await _roleRepository.SaveAsync();
        }

        public async Task<RoleDTO> GetRoleByIdAsync(Guid id)
        {
            return await _roleRepository.GetByIdAsync(id);
        }

        public async Task<IList<RoleDTO>> GetRolesAsync()
        {
            return await _roleRepository.GetAllAsync();
        }

        public async Task<RoleDTO> UpdateRoleAsync(RoleDTO roleDTO)
        {
            var role = await _roleRepository.UpdateAsync(roleDTO);
            await _roleRepository.SaveAsync();
            return role;
        }
    }
}
