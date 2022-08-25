using Back.Business.Models;

namespace Back.Business.Interfaces
{
    public interface IRoleService
    {
        public Task<IList<RoleDTO>> GetRolesAsync();
        public Task<RoleDTO> GetRoleByIdAsync(int id);
        public Task<RoleDTO> AddRoleAsync(RoleDTO roleDTO);
        public Task<RoleDTO> UpdateRoleAsync(RoleDTO roleDTO);
        public Task<RoleDTO> DeleteRoleAsync(int id);
    }
}
