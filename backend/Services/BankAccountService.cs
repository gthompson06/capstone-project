public class BankAccountService
{
    private readonly Database _database;
    public BankAccountService(Database database)
    {
        _database = database;
    }

    public async Task<List<UserBankAccount>> GetBankAccountInfo(int userId)
    {
        var account = await _database.GetUserBankAccounts(userId);
        return account;
    }
    public async Task PostBankAccountInfo(UserBankAccount account)
    {
        // Might need to validate if user exists already

        await _database.PostUserBankAccountInfo(account);
    }
    public async Task UpdateBankAccountInfo(UserBankAccount account)
    {
        await _database.SaveUserBankAccountInfo(account);
    }
    public async Task DeleteBankAccountInfo(UserBankAccount account)
    {
        await _database.DeleteUserBankAccountInfo(account);
    }
}