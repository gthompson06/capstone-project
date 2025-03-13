using Microsoft.AspNetCore.Mvc;
using static UserService;

[ApiController]
[Route("user")]
public class UserController : ControllerBase
{

    public readonly UserService _userService;

    public UserController(UserService userService)
    {
        _userService = userService;
    }
    [HttpGet("")]
    public IActionResult Load()
    {
        return Ok(new { Message = "Welcome" });
    }
    [HttpGet("{userId}")]
    public async Task<IActionResult> GetUserInfo(int userId)
    {
        var response = await _userService.GetUserInfo(userId);
        return Ok(response);
    }
    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] UserInfo newUser)
    {
        await _userService.PostUserInfo(newUser);
        return CreatedAtAction(nameof(GetUserInfo), new { userId = newUser.UserId }, newUser);
    }
    [HttpPut("{userId}")]
public async Task<IActionResult> UpdateUser(int userId, [FromBody] UserInfo updatedUser)
{
    var response = await _userService.GetUserInfo(userId);
    if (response == null)
    {
        return NotFound(new { Message = "User not found" });
    }
    response.UserName = updatedUser.UserName ?? response.UserName;
    response.Email = updatedUser.Email ?? response.Email;
    response.FirstName = updatedUser.FirstName ?? response.FirstName;
    response.LastName = updatedUser.LastName ?? response.LastName;
    response.DateOfBirth = updatedUser.DateOfBirth ?? response.DateOfBirth;
    response.City = updatedUser.City ?? response.City;
    response.State = updatedUser.State ?? response.State;
    response.School = updatedUser.School ?? response.School;
    response.HashedPassword = updatedUser.HashedPassword ?? response.HashedPassword;

    await _userService.UpdateUserInfo(response);

    return Ok(response); 
}
[HttpDelete("{userId}")]
public async Task<IActionResult> DeleteUser(int userId)
{
    var response = await _userService.GetUserInfo(userId);
    if (response == null)
    {
        return NotFound(new { Message = "User not found" });
    }
    await _userService.DeleteUserInfo(userId);

    return NoContent(); 
}
}