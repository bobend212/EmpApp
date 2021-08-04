using System;

namespace API.Helpers
{
    public static class DateTimeExtensions
    {
        public static int CalculateExperience(this DateTime hireDate)
        {
            var today = DateTime.Today;
            var exp = today.Year - hireDate.Year;
            if (hireDate.Date > today.AddYears(-exp)) exp--;
            return exp;
        }

    }
}