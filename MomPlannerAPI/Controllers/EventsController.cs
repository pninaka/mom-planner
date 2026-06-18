using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MomPlannerAPI.Data;
using MomPlannerAPI.Models;
using MomPlannerAPI.Services;

namespace MomPlannerAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class EventsController(AppDbContext db) : ControllerBase
{
    private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet("week")]
    public async Task<IActionResult> GetWeek([FromQuery] DateTime weekStart)
    {
        var weekEnd = weekStart.AddDays(6);

        var events = await db.Events
            .Where(e => e.UserId == UserId && e.Date >= weekStart && e.Date <= weekEnd)
            .ToListAsync();

        var children = await db.Children.Where(c => c.UserId == UserId).ToListAsync();
        var reminders = ReminderService.GetRemindersForWeek(weekStart, children);

        return Ok(new { events, reminders });
    }

    [HttpPost]
    public async Task<ActionResult<Event>> AddEvent(Event ev)
    {
        ev.UserId = UserId;
        db.Events.Add(ev);
        await db.SaveChangesAsync();
        return Ok(ev);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEvent(int id)
    {
        var ev = await db.Events.FirstOrDefaultAsync(e => e.Id == id && e.UserId == UserId);
        if (ev == null) return NotFound();

        db.Events.Remove(ev);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
