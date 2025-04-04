using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Amazon.Auth.AccessControlPolicy.ActionIdentifiers;
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
            HashedPassword = _passwordService.Hash(request.Password),
            SecurityQuestion = request.SecurityQuestion,
            SecurityAnswer = _passwordService.Hash(request.SecurityAnswer)
        };
        await _database.PostUserInfo(user);
        return new ServiceResult
        {
            Success = true,
            Message = "Registration successful."
        };
    }

    public async Task<UserInfo?> GetUserOnLogin(LoginDTO request)
    {
        var matchedUser = await _database.GetUserByUserName(request.UserName);
        if (matchedUser == null) return null;

        if (!_passwordService.Verify(matchedUser.HashedPassword, request.Password))
            throw new Exception("Invalid password.");

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
    public async Task<List<UserInfo>> GetAllUsers()
    {
        return await _database.GetAllUsers();

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