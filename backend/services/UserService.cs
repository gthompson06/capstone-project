using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using requests.Registration;
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
    public async Task PostUserInfo(UserInfo newUser)
    {
        await _database.PostUserInfo(newUser);
    }
    public async Task UpdateUserInfo(UserInfo updatedUser)
    {
        await _database.SaveUserInfo(updatedUser);
    }
    public async Task DeleteUserInfo(int userId)
    {
        var user = await _database.GetUserInfo(userId);
        if (user != null)
        {
            await _database.DeleteUserInfo(userId);
        }
    }
}