using Microsoft.EntityFrameworkCore;

namespace Back.Models
{
    public class UserRoleContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Role> Roles { get; set; } = null!;

        public UserRoleContext(DbContextOptions<UserRoleContext> options)
        : base(options)
        {
            Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasData(
                new Role { Id = 1, Name = "Role 1" },
                new Role { Id = 2, Name = "Role 2" },
                new Role { Id = 3, Name = "Role 3" }
            );
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Name = "Oleg" },
                new User { Id = 2, Name = "Alex" },
                new User { Id = 3, Name = "Greg" }
            );
        }
    }
}
