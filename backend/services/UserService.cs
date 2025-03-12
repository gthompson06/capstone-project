using System.Threading.Tasks;
using Amazon.DynamoDBv2.Model;

using Microsoft.AspNetCore.Mvc;

public class UserService
{
    private readonly Database _database;
    public UserService(Database database)
    {
        _database = database;
    }
    public async Task<string> GetFirstNameByUserName(int userId)
    {
        var userInfo = await _database.GetUserInfo(userId);
        if (userInfo == null) return null;
        return userInfo.UserName;
    }
    public async Task<UserInfo> GetUserInfo(int userId)
    {
        var userInfo = await _database.GetUserInfo(userId);
        return userInfo;
    }
    public async Task PostUserInfo(UserInfo userInfo)
    {
        // Might need to validate if user exists already

        await _database.PostUserInfo(userInfo);
    }

}