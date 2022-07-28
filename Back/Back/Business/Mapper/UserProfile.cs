using AutoMapper;
using Back.Business.Models;
using Back.Data.Entities;

namespace Back.Business.Mapper
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDTO>()
                .ForMember(
                    dest => dest.UserId,
                    opt => opt.MapFrom(x => x.Id))
                .ForMember(
                    dest => dest.UserName,
                    opt => opt.MapFrom(x => x.Name))
                .ForMember(
                    dest => dest.UserRoles,
                    opt => opt.MapFrom(x => x.Roles));

            CreateMap<UserDTO, User>()
                .ForMember(
                    dest => dest.Id,
                    opt => opt.MapFrom(x => x.UserId))
                .ForMember(
                    dest => dest.Name,
                    opt => opt.MapFrom(x => x.UserName))
                .ForMember(
                    dest => dest.Roles,
                    opt => opt.MapFrom(x => x.UserRoles));
        }
    }
}
