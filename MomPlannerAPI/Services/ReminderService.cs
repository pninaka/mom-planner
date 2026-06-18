using MomPlannerAPI.Models;

namespace MomPlannerAPI.Services;

public static class ReminderService
{
    public static List<object> GetRemindersForWeek(DateTime weekStart, List<Child> children)
    {
        var reminders = new List<object>();
        var weekEnd = weekStart.AddDays(6);

        for (var day = weekStart; day <= weekEnd; day = day.AddDays(1))
        {
            // יום ראשון = קניה שבועית
            if (day.DayOfWeek == DayOfWeek.Sunday)
                reminders.Add(new { Date = day.ToString("yyyy-MM-dd"), Title = "🛒 סגרי קניה שבועית", Type = "shopping" });

            // ראש חודש = חולצה לבנה
            if (day.Day == 1)
                reminders.Add(new { Date = day.ToString("yyyy-MM-dd"), Title = "👕 חולצה לבנה לילדים — ראש חודש!", Type = "rosh_hodesh" });

            // ימי הולדת
            foreach (var child in children)
            {
                if (child.BirthDate.Month == day.Month && child.BirthDate.Day == day.Day)
                    reminders.Add(new { Date = day.ToString("yyyy-MM-dd"), Title = $"🎂 יום הולדת ל{child.Name}!", Type = "birthday" });
            }
        }

        return reminders;
    }
}
