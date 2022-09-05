using Back.Business.Models;

namespace Back.Business.Interfaces
{
    public interface IRoleService
    {
        public Task<IList<RoleDTO>> GetRolesAsync();
        public Task<RoleDTO> GetRoleByIdAsync(Guid id);
        public Task<RoleDTO> AddRoleAsync(RoleDTO roleDTO);
        public Task<RoleDTO> UpdateRoleAsync(RoleDTO roleDTO);
        public Task DeleteRoleAsync(Guid id);
    }
}
