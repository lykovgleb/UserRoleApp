﻿namespace Back.Data.Entities
{
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public IList<User> Users { get; set; }
    }
}