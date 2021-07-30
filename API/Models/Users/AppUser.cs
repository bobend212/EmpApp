namespace API.Models.Users
{
    public class AppUser
    {
        public int AppUserId { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}