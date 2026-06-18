using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MomPlannerAPI.Data;
using MomPlannerAPI.DTOs;
using MomPlannerAPI.Models;

namespace MomPlannerAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ChildrenController(AppDbContext db) : ControllerBase
{
    private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public async Task<ActionResult<List<Child>>> GetChildren()
        => await db.Children.Where(c => c.UserId == UserId).ToListAsync();

    [HttpPost]
    public async Task<ActionResult<Child>> AddChild(ChildDto dto)
    {
        var child = new Child { UserId = UserId, Name = dto.Name, BirthDate = dto.BirthDate };
        db.Children.Add(child);
        await db.SaveChangesAsync();
        return Ok(child);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateChild(int id, ChildDto dto)
    {
        var child = await db.Children.FirstOrDefaultAsync(c => c.Id == id && c.UserId == UserId);
        if (child == null) return NotFound();

        child.Name = dto.Name;
        child.BirthDate = dto.BirthDate;
        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteChild(int id)
    {
        var child = await db.Children.FirstOrDefaultAsync(c => c.Id == id && c.UserId == UserId);
        if (child == null) return NotFound();

        db.Children.Remove(child);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
