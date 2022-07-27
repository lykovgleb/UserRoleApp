using Back.Interfaces;
using Back.Models;

namespace Back.Services
{
    public class UserRoleService : IUserRoleService
    {
        private readonly UserRoleContext _userRoleContext;

        public UserRoleService(UserRoleContext userRoleContext)
        {
            _userRoleContext = userRoleContext;
        }

        public void AddRole(Role role)
        {
            try
            {
                _userRoleContext.Roles.Add(role);
                _userRoleContext.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void AddUser(User user)
        {
            try
            {
                _userRoleContext.Users.Add(user);
                _userRoleContext.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void DeleteRole(int id)
        {
            try
            {
                var role = _userRoleContext.Roles.Find(id);
                if (role != null)
                    _userRoleContext.Roles.Remove(role);
                _userRoleContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteUser(int id)
        {
            try
            {
                var user = _userRoleContext.Users.Find(id);
                if (user != null)
                _userRoleContext.Users.Remove(user);
                _userRoleContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public Role GetRoleById(int id)
        {
            try
            {
                Role? role = _userRoleContext.Roles.Find(id);
                return role;               
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<Role> GetRoles()
        {
            try
            {
                return _userRoleContext.Roles.ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public User GetUserById(int id)
        {
            try
            {
                User? user = _userRoleContext.Users.Find(id);
                return user;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<User> GetUsers()
        {
            try
            {
                return _userRoleContext.Users.ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdateRole(Role role)
        {
            try
            {
                var oldRole = _userRoleContext.Roles.Find(role.Id);
                if (oldRole != null)
                {
                    oldRole.Name = role.Name;
                    oldRole.Users = role.Users;
                }
                _userRoleContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdateUser(User user)
        {
            try
            {
                var oldUser = _userRoleContext.Users.Find(user.Id);
                if (oldUser != null)
                {
                    oldUser.Name = user.Name;
                    oldUser.Roles = user.Roles;
                }
                _userRoleContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
