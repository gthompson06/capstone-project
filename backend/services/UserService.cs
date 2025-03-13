using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

public class UserService {
    private readonly Database _database;
    public UserService(Database database){
        _database = database;
    }
    public async Task<string> GetFirstNameByUserName(int userId){
        var userInfo = await _database.GetUserInfo(userId);
        if(userInfo == null) return null;
        return userInfo.UserName;
    }
    public async Task<UserInfo> GetUserInfo(int userId){
        var userInfo = await _database.GetUserInfo(userId);
        return userInfo;
    }
    public async Task PostUserInfo(UserInfo newUser)
    {

        await _database.PostUserInfo(newUser);  // Save the new user to the database
    }
}