public class BankAccountService
{
    private readonly Database _database;
    public BankAccountService(Database database)
    {
        _database = database;
    }

    public async Task<List<UserBankAccount>> GetBankAccountInfo(int userId)
    {
        var userInfo = await _database.GetUserBankAccounts(userId);
        return userInfo;
    }
    public async Task PostBankAccountInfo(UserBankAccount userInfo)
    {
        // Might need to validate if user exists already

        await _database.PostUserBankAccountInfo(userInfo);
    }
}