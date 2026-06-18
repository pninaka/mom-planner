namespace MomPlannerAPI.Models;

public class Event
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Title { get; set; } = "";
    public DateTime Date { get; set; }
    public string? Time { get; set; }
    public string? Description { get; set; }

    public User User { get; set; } = null!;
}
