using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MomPlannerAPI.Data;
using MomPlannerAPI.DTOs;
using MomPlannerAPI.Models;
using MomPlannerAPI.Services;

namespace MomPlannerAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(AppDbContext db, JwtService jwt) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register(RegisterRequest req)
    {
        if (await db.Users.AnyAsync(u => u.Email == req.Email))
            return BadRequest("כתובת האימייל כבר רשומה במערכת");

        var user = new User
        {
            Name = req.Name,
            Email = req.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.Password),
            Children = req.Children.Select(c => new Child { Name = c.Name, BirthDate = c.BirthDate }).ToList()
        };

        db.Users.Add(user);
        await db.SaveChangesAsync();

        return Ok(new AuthResponse(jwt.GenerateToken(user), user.Name, user.Id));
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest req)
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.Email == req.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(req.Password, user.PasswordHash))
            return Unauthorized("אימייל או סיסמה שגויים");

        return Ok(new AuthResponse(jwt.GenerateToken(user), user.Name, user.Id));
    }
}
