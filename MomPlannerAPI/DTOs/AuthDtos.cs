namespace MomPlannerAPI.DTOs;

public record RegisterRequest(
    string Name,
    string Email,
    string Password,
    List<ChildDto> Children
);

public record LoginRequest(string Email, string Password);

public record ChildDto(string Name, DateTime BirthDate);

public record AuthResponse(string Token, string Name, int UserId);
