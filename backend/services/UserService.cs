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
    // public async Task<User> GetUser(int userId){
    //     var user = await AssembleUser(userId);
    //     return user;
    // }

    // private async Task<User> AssembleUser(int userId){
    //     var userInfo = await _database.GetUserInfo(userId);
    //     if(userInfo == null) return null;
    //     var userName = userInfo.UserName;
    //     var bankAccounts = await _database.GetUserBankAccounts(userName);
    //     var expenses = await _database.GetUserExpenses(userName);
    //     var tasks = await _database.GetUserTasks(userName);
    //     var schedules = await _database.GetUserSchedules(userName);
    //     var user = new User{
    //         UserInfo = userInfo,
    //         Tasks = tasks,
    //         Expenses = expenses,
    //         BankAccounts = bankAccounts,
    //         Schedules = schedules
    //     };
    //     return user;
    // }
}