using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("worthy/auth")]
public class AuthController : ControllerBase
{
    private readonly TokenService _tokenService;

    public AuthController(TokenService tokenService)
    {
        _tokenService = tokenService;
    }

    [HttpGet("getNewAccessToken")]
    public IActionResult GetNewAccessToken()
    {
        return Ok(new { token = _tokenService.GenerateAccessToken() });
    }
}