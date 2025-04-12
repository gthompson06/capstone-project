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
    private readonly TokenService _tokenService;

    public UserController(UserService userService, IDynamoDBContext dbContext, TokenService tokenService)
    {
        _userService = userService;
        _dbContext = dbContext;
        _tokenService = tokenService;
    }
    [HttpGet("")]
    public IActionResult Load()
    {
        return Ok(new { Message = "Welcome" });
    }

    [HttpGet("allUsers")]
    public async Task<IActionResult> GetAllUsers()
    {
        var response = await _userService.GetAllUsers();
        if (response == null)
        {
            return NotFound(new { Message = "Bad Request" });
        }
        else
        {
            return Ok(response);
        }
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegistrationDTO request)
    {

        var result = await _userService.Register(request);
        return result.Success ? Ok(new { message = result.Message }) : BadRequest(new { message = result.Message });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDTO request)
    {
        var user = await _userService.GetUserOnLogin(request);
        if (user == null)
        {
            return Unauthorized(new { message = "Invalid username or password" });
        }

        await _tokenService.GenerateRefreshTokenAsync(user.UserId);
        var accessToken = _tokenService.GenerateAccessToken(user.UserName);

        return Ok(new
        {
            message = "Login successful",
            user = user,
            token = accessToken
        });
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
    [HttpGet("username/{username}")]
    public async Task<IActionResult> GetUserByUserName(string username)
    {
        var response = await _userService.GetUserInfoByUsername(username);
        if (response == null)
        {
            return NotFound(new { Message = "404: User not found" });
        }
        else
        {
            return Ok(response);
        }
    }
    // [HttpGet("{email}")]
    // public async Task<IActionResult> GetUserEmail(string email)
    // {
    //     var response = await _userService.GetUserEmail(email);

    //     if (response == null)
    //     {
    //         return NotFound(new { Message = "404: User not found" });
    //     }
    //     else
    //     {
    //         return Ok(response);
    //     }

    // }

    // [HttpPost("create")]
    // public async Task<IActionResult> CreateUser([FromBody] UserInfo request)
    // {
    //     try
    //     {
    //         var queryConfig = new DynamoDBOperationConfig
    //         {
    //             IndexName = "UserName-index"
    //         };

    //         var users = await _dbContext.QueryAsync<UserInfo>(request.UserName, queryConfig).GetRemainingAsync();

    //         var matchedUser = users.FirstOrDefault(user => user.Email == request.Email);

    //         if (matchedUser != null) {
    //             return Unauthorized(new { message = "Username or Email already exists" });
    //         }

    //         await _userService.PostUserInfo(request);
    //         return CreatedAtAction(nameof(GetUserInfo), new { userId = UserInfo.Username }, UserInfo);
    //     }
    //     catch (Exception ex)
    //     {
    //         return StatusCode(500, new { message = "Error creating account", error = ex.Message });
    //     }
    // }

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
