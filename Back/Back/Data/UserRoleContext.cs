using Back.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Back.Data
{
    public class UserRoleContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }

        public UserRoleContext(DbContextOptions<UserRoleContext> options)
        : base(options)
        {
            Database.EnsureDeleted();
            Database.EnsureCreated();
        }
    }
}
