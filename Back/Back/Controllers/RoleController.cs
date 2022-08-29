using Back.Business.Interfaces;
using Back.Business.Models;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _RoleService;

        public RoleController(IRoleService roleService)
        {
            _RoleService = roleService;
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _RoleService.GetRolesAsync());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                return Ok(await _RoleService.GetRoleByIdAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(RoleDTO roleDTO)
        {
            try
            {
                return Ok(await _RoleService.AddRoleAsync(roleDTO));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(RoleDTO roleDTO)
        {

            try
            {
                return Ok(await _RoleService.UpdateRoleAsync(roleDTO));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _RoleService.DeleteRoleAsync(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
