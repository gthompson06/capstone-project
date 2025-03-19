using Microsoft.AspNetCore.Mvc;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] Registration request)
    {
        try
        {
            var queryConfig = new DynamoDBOperationConfig
            {
                IndexName = "UserName-index"
            };

            var users = await _dbContext.QueryAsync<UserInfo>(request.UserName, queryConfig).GetRemainingAsync();

            var matchedUser = users.FirstOrDefault(user => user.HashedPassword == request.Password);

            if (matchedUser == null)
                return Unauthorized(new { message = "Invalid username or password" });

            return Ok(new { message = "Login successful", user = matchedUser });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error logging in", error = ex.Message });
        }
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetUserInfo(int userId)
    {
        var response = await _userService.GetUserInfo(userId);
        return Ok(response);
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateUser([FromBody] Registration registration)
    {
        await _userService.CreateUser(registration);
        return CreatedAtAction(nameof(GetUserInfo), new { userId = registration.UserName }, registration);
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
