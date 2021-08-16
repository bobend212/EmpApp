namespace API.Helpers
{
    public class UserParams
    {
        public const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public string CurrentUsername { get; set; }
        public string Gender { get; set; }
        public int MinExperience { get; set; } = 0;
        public int MaxExperience { get; set; } = 150;
        public string OrderBy { get; set; } = "lastActive";
    }
}