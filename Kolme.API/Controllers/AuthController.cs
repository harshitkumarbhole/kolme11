using Kolme.API.Services;
using Kolme.API.Helpers;

namespace Kolme.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(AuthService authService, ILogger<AuthController> logger)
    {
        _authService = authService;
        _logger = logger;
    }

    [HttpPost("login")]
    public ActionResult<string> Login(LoginDTO dto)
    {
        try
        {
            var token = _authService.Authenticate(dto.Username, dto.Password);
            if (token == null) return Unauthorized();
            return Ok(token);
        }
        catch (Exception ex)
        {
            _logger.LogException(ex);
            return StatusCode(500, "Internal server error");
        }
    }
}
