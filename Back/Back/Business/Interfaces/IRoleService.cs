using Back.Business.Models;

namespace Back.Business.Interfaces
{
    public interface IRoleService
    {
        public Task<IList<RoleDTO>> GetRolesAsync();
        public Task<RoleDTO> GetRoleByIdAsync(int id);
        public Task AddRoleAsync(RoleDTO roleDTO);
        public Task UpdateRoleAsync(RoleDTO roleDTO);
        public Task DeleteRoleAsync(int id);
    }
}
