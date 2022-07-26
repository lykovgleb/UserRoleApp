﻿using Back.Business.Models;

namespace Back.Business.Interfaces
{
    public interface IUserService
    {
        public Task<IList<UserDTO>> GetUsersAsync();
        public Task<UserDTO> GetUserByIdAsync(Guid id);
        public Task<UserDTO> AddUserAsync(UserDTO userDTO);
        public Task<UserDTO> UpdateUserAsync(UserDTO userDTO);
        public Task DeleteUserAsync(Guid id);


    }
}
