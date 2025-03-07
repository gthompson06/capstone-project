using Microsoft.AspNetCore.Mvc;
using UserModel;

public interface IUserService {
    public Task<string> GetFirstNameByUserName(string userName);
}

public class UserService : IUserService {
    private readonly Database _database;
    public UserService(Database database){
        _database = database;
    }
    public async Task<string> GetFirstNameByUserName(string userName){
        var user = await _database.GetUserById(userName);
        if(user == null) return null;
        return user.UserName;
    }
}