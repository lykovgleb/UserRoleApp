﻿namespace Back.Business.Models
{
    public class UserDTO
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public List<RoleDTO> UserRoles { get; set; }
    }
}