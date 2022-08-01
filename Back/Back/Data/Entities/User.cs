namespace Back.Data.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public IList<Role> Roles { get; set; } = new List<Role>();
    }
}
