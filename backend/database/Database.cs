using Amazon.DynamoDBv2.DataModel;
using Microsoft.AspNetCore.Mvc;
using requests.Registration;

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
    public async Task PostUserInfo(UserInfo user)
    {
        await _context.SaveAsync(user);
    }
    public async Task PostUserBankAccountInfo(UserBankAccount user)
    {
        await _context.SaveAsync(user);
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
    public async Task PostUserExpenseInfo(UserExpense expense)
    {
        await _context.SaveAsync(expense);
    }
    public async Task SaveUserExpenseInfo(UserExpense expense)
    {
        await _context.SaveAsync(expense);
    }
    public async Task DeleteUserExpenseInfo(UserExpense expense)
    {
        await _context.DeleteAsync(expense);
    }
    public async Task PostUserTaskInfo(UserTask task)
    {
        await _context.SaveAsync(task);
    }
    public async Task SaveUserTaskInfo(UserTask task)
    {
        await _context.SaveAsync(task);
    }
    public async Task DeleteUserTaskInfo(UserTask task)
    {
        await _context.DeleteAsync(task);
    }
    public async Task PostUserScheduleInfo(UserSchedule schedule)
    {
        await _context.SaveAsync(schedule);
    }
    public async Task SaveUserScheduleInfo(UserSchedule schedule)
    {
        await _context.SaveAsync(schedule);
    }
    public async Task DeleteUserScheduleInfo(UserSchedule schedule)
    {
        await _context.DeleteAsync(schedule);
    }
}