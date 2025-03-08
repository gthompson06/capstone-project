using Microsoft.AspNetCore.Mvc;
using static UserService;

[ApiController]
[Route("user")]
public class UserController : ControllerBase {

    public readonly UserService _userService;

    public UserController (UserService userService) {
        _userService = userService;
    }
    [HttpGet("")]
    public IActionResult Load () {
        return Ok(new {Message = "Welcome"});
    }
    [HttpGet("{userId}")]
    public async Task<IActionResult> GetUserInfo(int userId){
        var response = await _userService.GetUserInfo(userId);
        return Ok(response);
    }
}