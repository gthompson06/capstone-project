using Amazon.DynamoDBv2.DataModel;
using Microsoft.AspNetCore.Mvc;
using UserModel;

public class Interaction {
    private readonly IDynamoDBContext _context;
    public Interaction (IDynamoDBContext context){
        _context = context;
    }
    public Task<User> GetUserById (string userId) {
        var user = _context.LoadAsync<User>(userId);
        return user;
    }
}