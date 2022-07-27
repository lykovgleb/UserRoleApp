using Back.Interfaces;
using Back.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers
{
    

    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRoleService _userRoleService;

        public UsersController (IUserRoleService userRoleService)
        {
            _userRoleService = userRoleService;
        }
    

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return _userRoleService.GetUsers();
        }

        [HttpGet("{id}")]
        public User Get(int id)
        {
            return _userRoleService.GetUserById(id);
        }

        [HttpPost]
        public void Post(User user)
        {
            _userRoleService.AddUser(user);
        }

        [HttpPut]
        public void Put(User user)
        {
            _userRoleService.UpdateUser(user);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _userRoleService.DeleteUser(id);
        }
    }
}
