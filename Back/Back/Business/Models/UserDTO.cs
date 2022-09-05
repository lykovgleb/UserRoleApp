namespace Back.Business.Models
{
    public class UserDTO
    {
        public Guid UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public List<RoleDTO> UserRoles { get; set; } = new List<RoleDTO>();
    }
}
