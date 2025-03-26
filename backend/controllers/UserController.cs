using Microsoft.AspNetCore.Mvc;
using static UserService;
using requests.RegistrationDTO;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using requests.LoginDTO;

[ApiController]
[Route("worthy/user")]
public class UserController : ControllerBase
{
    private readonly UserService _userService;
    private readonly IDynamoDBContext _dbContext;

    public UserController(UserService userService, IDynamoDBContext dbContext)
    {
        _userService = userService;
        _dbContext = dbContext;
    }
    [HttpGet("")]
    public IActionResult Load()
    {
        return Ok(new { Message = "Welcome" });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegistrationDTO request)
    {
        var result = await _userService.Register(request);
        var response = new { message = result.Message };
        if (result.Success)
        {
            return Ok(response);
        }
        return BadRequest(response);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDTO request)
    {
        var user = await _userService.Login(request);
        if (user == null)
        {
            return Unauthorized(new { message = "Invalid username or password" });
        }
        return Ok(new { message = "Login successful", user });
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetUserInfo(int userId)
    {
        var response = await _userService.GetUserInfo(userId);
        if (response == null)
        {
            return NotFound(new { Message = "404: User not found" });
        }
        else
        {
            return Ok(response);
        }
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateUser([FromBody] UserInfo userInfo)
    {
        await _userService.PostUserInfo(userInfo);
        return CreatedAtAction(nameof(GetUserInfo), new { userId = userInfo.UserName }, userInfo);
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
        else
        {
            await _userService.DeleteUserInfo(userId);
            return NoContent();
        }

    }
}
