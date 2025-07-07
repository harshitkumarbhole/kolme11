using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace Kolme.API.Services;

public class AuthService
{
    private readonly KolmeDbContext _context;
    private readonly IConfiguration _config;

    public AuthService(KolmeDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    public string? Authenticate(string username, string password)
    {
        var user = _context.Users.FirstOrDefault(u => u.Username == username && u.PasswordHash == password);
        if (user == null) return null;

        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: null,
            claims: null,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
