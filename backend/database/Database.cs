using Amazon.DynamoDBv2.DataModel;
using Microsoft.AspNetCore.Mvc;

public class Database {
    private readonly IDynamoDBContext _context;
    public Database (IDynamoDBContext context){
        _context = context;
    }
    public async Task<User> GetUserById (string userName) {
        var user = await _context.LoadAsync<User>(userName);
        return user;
    }
    public async Task<List<UTask>> GetUserTasks (string userName) {
        var tasks = await _context.QueryAsync<UTask>(userName).GetRemainingAsync();
        return tasks;
    }
    public async Task<List<Expense>> GetUserExpenses (string userName) {
        var expenses = await _context.QueryAsync<Expense>(userName).GetRemainingAsync();
        return expenses;
    }
    public async Task<List<Schedule>> GetUserSchedules (string userName) {
        var schedules = await _context.QueryAsync<Schedule>(userName).GetRemainingAsync();
        return schedules;
    }
    public async Task<List<BankAccount>> GetUserBankAccounts (string userName) {
        var bankAccounts = await _context.QueryAsync<BankAccount>(userName).GetRemainingAsync();
        return bankAccounts;
    }

}