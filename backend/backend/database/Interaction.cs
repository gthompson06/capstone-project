using Amazon.DynamoDBv2.DataModel;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using backend.Services;
using backend.entities;

namespace Interaction
{
    [ApiController]
    [Route("User")]
    public class UsersController : ControllerBase
    {
        private readonly DynamoDbService _dynamoDbService;

        public UsersController(DynamoDbService dynamoDbService)
        {
            _dynamoDbService = dynamoDbService;
        }
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            await _dynamoDbService.InsertItemAsync(user.UserName, user.FirstName, user.LastName, user.DateOfBirth, user.Email, user.Password);

            return Ok("User Created");
        }
        [HttpGet("{userName}")]
        public async Task<IActionResult> GetUser(string userName)
        {
            var user = await _dynamoDbService.GetItemAsync(userName);
            if (user == null)
            {
                return NotFound("User not found");
            }

            return Ok(user);
        }

        // Need update and delete
    }
}