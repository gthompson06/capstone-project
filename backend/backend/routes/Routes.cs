using Amazon.DynamoDBv2.DataModel;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Routes {
    [ApiController]
    [Route("worthy")]
    public class Routes {

        private readonly UserController _userController;
        public Routes (UserController userController) {
            _userController = userController;
        }
        [HttpGet("")]
        public IActionResult Load () {
            return Ok(new {Message = "Welcome"});
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserById (string userId) {
            var response = await _userController.GetUserById(userId);
            return response;
        }
    }
}