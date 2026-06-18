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
public class RecipesController(AppDbContext db) : ControllerBase
{
    private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public async Task<ActionResult<List<Recipe>>> GetRecipes([FromQuery] string? category)
    {
        var query = db.Recipes.Where(r => r.UserId == null || r.UserId == UserId);
        if (!string.IsNullOrEmpty(category))
            query = query.Where(r => r.Category == category);
        return await query.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Recipe>> AddRecipe(Recipe recipe)
    {
        recipe.UserId = UserId;
        db.Recipes.Add(recipe);
        await db.SaveChangesAsync();
        return Ok(recipe);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRecipe(int id)
    {
        var recipe = await db.Recipes.FirstOrDefaultAsync(r => r.Id == id && r.UserId == UserId);
        if (recipe == null) return NotFound();

        db.Recipes.Remove(recipe);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
