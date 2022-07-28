using AutoMapper;
using Back.Business.Models;
using Back.Data.Entities;

namespace Back.Business.Mapper
{
    public class RoleProfile : Profile
    {
        public RoleProfile()
        {
            CreateMap<Role, RoleDTO>();
            CreateMap<RoleDTO, Role>();
        }
    }
}
