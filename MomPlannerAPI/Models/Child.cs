namespace MomPlannerAPI.Models;

public class Child
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Name { get; set; } = "";
    public DateTime BirthDate { get; set; }

    public User User { get; set; } = null!;

    public int AgeYears => (int)((DateTime.Today - BirthDate).TotalDays / 365.25);
}
