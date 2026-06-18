namespace MomPlannerAPI.Models;

public class Recipe
{
    public int Id { get; set; }
    public int? UserId { get; set; } // null = ברירת מחדל
    public string Title { get; set; } = "";
    public string Category { get; set; } = ""; // "צהריים" | "ערב"
    public string Ingredients { get; set; } = "";
    public string Instructions { get; set; } = "";
    public string? ImageUrl { get; set; }
}
