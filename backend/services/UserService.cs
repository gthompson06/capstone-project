using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

public class UserService
{
    private readonly Database _database;
    private readonly PasswordService _passwordService;
    private readonly UserInfo _userInfo;
    public UserService(Database database, PasswordService passwordService)
    {
        _database = database;
        _passwordService = passwordService;
        // _userInfo = new UserInfo("", "");
    }
    public async Task<UserInfo> GetUserInfo(int userId)
    {
        var userInfo = await _database.GetUserInfo(userId);
        return userInfo;
    }
    public async Task CreateUser(Registration registration)
    {
        string password = registration.Password;
        string hashedPassword = _passwordService.Hash(password);
        _userInfo.HashedPassword = hashedPassword;
        await _database.PostUserInfo(_userInfo);
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