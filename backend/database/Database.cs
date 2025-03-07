using Amazon.DynamoDBv2.DataModel;
using Microsoft.AspNetCore.Mvc;

public class Database {
    private readonly IDynamoDBContext _context;
    public Database (IDynamoDBContext context){
        _context = context;
    }
    public async Task<User> GetUserById (string userId) {
        var user = await _context.LoadAsync<User>(userId);
        return user;
    }
}