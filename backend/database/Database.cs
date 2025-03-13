using Amazon.DynamoDBv2.DataModel;
using Microsoft.AspNetCore.Mvc;

public class Database
{
    private readonly IDynamoDBContext _context;
    public Database(IDynamoDBContext context)
    {
        _context = context;
    }
    public async Task<UserInfo> GetUserInfo(int userId)
    {
        var user = await _context.LoadAsync<UserInfo>(userId);
        return user;
    }
    public async Task<List<UserTask>> GetUserTasks(int userId)
    {
        var tasks = await _context.QueryAsync<UserTask>(userId).GetRemainingAsync();
        return tasks;
    }
    public async Task<List<UserExpense>> GetUserExpenses(int userId)
    {
        var expenses = await _context.QueryAsync<UserExpense>(userId).GetRemainingAsync();
        return expenses;
    }
    public async Task<List<UserSchedule>> GetUserSchedules(int userId)
    {
        var schedules = await _context.QueryAsync<UserSchedule>(userId).GetRemainingAsync();
        return schedules;
    }
    public async Task<List<UserBankAccount>> GetUserBankAccounts(int userId)
    {
        var bankAccounts = await _context.QueryAsync<UserBankAccount>(userId).GetRemainingAsync();
        return bankAccounts;
    }
    public async Task PostUserInfo(UserInfo userInfo)
    {
        await _context.SaveAsync(userInfo);
    }
    public async Task PostUserBankAccountInfo(UserBankAccount userInfo)
    {
        await _context.SaveAsync(userInfo);
    }
    public async Task SaveUserInfo(UserInfo user)
    {
        await _context.SaveAsync(user); 
    }
    public async Task DeleteUserInfo(int userId)
    {
    var user = await _context.LoadAsync<UserInfo>(userId);
    if (user != null)
        {
            await _context.DeleteAsync(user);
        }
    }
    public async Task SaveUserBankAccountInfo(UserBankAccount account)
    {
        await _context.SaveAsync(account);
    }
    public async Task DeleteUserBankAccountInfo(UserBankAccount account)
    {
        await _context.DeleteAsync(account);
    }
}