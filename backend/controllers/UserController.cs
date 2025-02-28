using Microsoft.AspNetCore.Mvc;
using static UserService;

[ApiController]
[Route("user")]
public class UserController : ControllerBase {

    public readonly IUserService _userService;

    public UserController (IUserService userService) {
        _userService = userService;
    }
    [HttpGet("")]
    public IActionResult Load () {
        return Ok(new {Message = "Welcome"});
    }

    [HttpGet("{userName}")]
    public async Task<IActionResult> GetFirstNameByUserName (string userName) {
        var response = await _userService.GetFirstNameByUserName(userName);
        if (response == null) return NotFound(new {Message = "User not found"});
        return Ok(new {Message = $"{response}"});
    }
}