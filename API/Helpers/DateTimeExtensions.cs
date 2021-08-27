using System;
using System.Collections.Generic;
using System.Linq;
using API.DTOs;

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

        public static string CalculateDayName(this DateTime date)
        {
            return date.DayOfWeek.ToString();
        }

    }
}