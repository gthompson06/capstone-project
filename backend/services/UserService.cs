using System.Threading.Tasks;
using Amazon.DynamoDBv2.DataModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using requests.LoginDTO;
using requests.RegistrationDTO;
public class UserService
{
    private readonly Database _database;
    private readonly PasswordService _passwordService;
    public UserService(Database database, PasswordService passwordService)
    {
        _database = database;
        _passwordService = passwordService;
    }

    public async Task<ServiceResult> Register(RegistrationDTO request)
    {
        bool isUnique = await _database.IsUniqueUserName(request.UserName);
        if (!isUnique)
        {
            return new ServiceResult
            {
                Success = false,
                Message = "Username already exists."
            };
        }
        var user = new UserInfo
        {
            UserId = await _database.GetNextUserId(),
            UserName = request.UserName,
            Email = request.Email,
            HashedPassword = _passwordService.Hash(request.Password)
        };
        await _database.PostUserInfo(user);
        return new ServiceResult
        {
            Success = true,
            Message = "Registration successful."
        };
    }

    public async Task<UserInfo?> Login(LoginDTO request)
    {
        var matchedUser = await _database.GetUserByUserName(request.UserName);
        if (matchedUser == null) return null;

        var inputPwdHashed = _passwordService.Hash(request.Password);
        if (matchedUser.HashedPassword != inputPwdHashed)
            throw new Exception("Invalid password.");
        // matchedUser.Token = generateJWT();
        return matchedUser;
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
        await _database.PostUserInfo(updatedUser);
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