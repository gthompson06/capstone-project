using Amazon.DynamoDBv2.DataModel;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using UserModel;

namespace Interaction {
    [ApiController]
    [Route("worthy")]
    public class UserController : ControllerBase {

        // Load context for use when controller is called
        private readonly IDynamoDBContext _context;
        public UserController (IDynamoDBContext context) {
            _context = context;
        }


        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserById (string userId) {
            var user = await _context.LoadAsync<User>(userId);
            if(user == null){
                return NotFound(new {Message = "User not found."});
            }
            return Ok(user);
        }
    }
}