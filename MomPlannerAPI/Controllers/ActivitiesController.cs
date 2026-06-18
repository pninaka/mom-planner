using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MomPlannerAPI.Data;
using MomPlannerAPI.Models;

namespace MomPlannerAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ActivitiesController(AppDbContext db) : ControllerBase
{
    private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        // מביא את גילאי הילדים ומסנן לפיהם
        var children = await db.Children.Where(c => c.UserId == UserId).ToListAsync();

        if (!children.Any())
            return await db.Activities.Where(a => a.UserId == null || a.UserId == UserId).ToListAsync();

        var ages = children.Select(c => c.AgeYears).ToList();
        var minAge = ages.Min();
        var maxAge = ages.Max();

        return await db.Activities
            .Where(a => (a.UserId == null || a.UserId == UserId) && a.MinAge <= maxAge && a.MaxAge >= minAge)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Activity>> AddActivity(Activity activity)
    {
        activity.UserId = UserId;
        db.Activities.Add(activity);
        await db.SaveChangesAsync();
        return Ok(activity);
    }
}
