
public class ExpenseService
{
    private readonly Database _database;
    public ExpenseService(Database database)
    {
        _database = database;
    }

    public async Task<List<UserExpense>> GetExpenseInfo(int userId)
    {
        var expense = await _database.GetUserExpenses(userId);
        return expense;
    }
    public async Task PostExpenseInfo(UserExpense expense)
    {
        // Might need to validate if user exists already

        await _database.PostUserExpenseInfo(expense);
    }
    public async Task UpdateExpenseInfo(UserExpense expense)
    {
        await _database.SaveUserExpenseInfo(expense);
    }
    public async Task DeleteExpenseInfo(UserExpense expense)
    {
        await _database.DeleteUserExpenseInfo(expense);
    }

}