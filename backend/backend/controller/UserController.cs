using Amazon.DynamoDBv2.DataModel;
using Microsoft.AspNetCore.Mvc;

public class UserController : ControllerBase {
    private readonly Interaction _interaction;
    public UserController(Interaction interaction){
        _interaction = interaction;
    }
    public async Task<IActionResult> GetUserById(string userId){
        var user = await _interaction.GetUserById(userId);

        return Ok(new {Message = "Welcome"});
    }
}