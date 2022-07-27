using Back.Models;

namespace Back.Interfaces
{
    public interface IUserRoleService
    {
        public List<User> GetUsers();
        public User GetUserById(int id);
        public List<Role> GetRoles();
        public Role GetRoleById(int id);
        public void AddUser(User user);
        public void UpdateUser(User user);
        public void DeleteUser(int id);
        public void AddRole(Role role);
        public void UpdateRole(Role role);
        public void DeleteRole(int id);

    }
}
