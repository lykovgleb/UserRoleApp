﻿using Back.Business.Interfaces;
using Back.Business.Models;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers
{


    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _UserService;

        public UserController(IUserService userRoleService)
        {
            _UserService = userRoleService;
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _UserService.GetUsersAsync());
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
                return Ok(await _UserService.GetUserByIdAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(UserDTO userDTO)
        {
            try
            {
                var AddedUserDTO = await _UserService.AddUserAsync(userDTO);
                return Ok(AddedUserDTO);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpPut]
        public async Task<IActionResult> Put(UserDTO userDTO)
        {
            try
            {
                var UpdatedUserDTO = await _UserService.UpdateUserAsync(userDTO);
                return Ok(UpdatedUserDTO);
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
                var userDTO = await _UserService.DeleteUserAsync(id);
                return Ok(userDTO);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
