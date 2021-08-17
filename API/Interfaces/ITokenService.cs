using System.Threading.Tasks;
using API.Models.Users;

namespace API.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}