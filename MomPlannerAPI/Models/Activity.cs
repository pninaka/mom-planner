namespace MomPlannerAPI.Models;

public class Activity
{
    public int Id { get; set; }
    public int? UserId { get; set; } // null = ברירת מחדל
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public int MinAge { get; set; }
    public int MaxAge { get; set; }
}
