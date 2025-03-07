using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

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
    public async Task<CompleteUser> GetCompleteUser(string userName){
        var user = await AssembleUser(userName);
        return user;
    }

    private async Task<CompleteUser> AssembleUser(string userName){
        var user = await _database.GetUserById(userName);
        if(user == null) return null;
        var bankAccounts = await _database.GetUserBankAccounts(userName);
        var expenses = await _database.GetUserExpenses(userName);
        var tasks = await _database.GetUserTasks(userName);
        var schedules = await _database.GetUserSchedules(userName);
        var completeUser = new CompleteUser(user, tasks, expenses, bankAccounts, schedules);
        return completeUser;
    }
}