using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;

public class Database
{
    private readonly IAmazonDynamoDB _client;
    private readonly IDynamoDBContext _context;
    private readonly DynamoDBOperationConfig _config;

    public Database(IAmazonDynamoDB client, IDynamoDBContext context, DynamoDBOperationConfig config)
    {
        _client = client;
        _context = context;
        _config = config;
    }

    public async Task<UserInfo> GetUserByUserName(string userName)
    {
        var user = await _context.QueryAsync<UserInfo>(userName, _config).GetNextSetAsync();
        return user.FirstOrDefault();
    }

    public async Task<bool> IsUniqueUserName(string userName)
    {
        var matches = await _context.QueryAsync<UserInfo>(userName, _config).GetNextSetAsync();
        return matches.Count == 0;
    }

    public async Task<int> GetNextUserId()
    {
        var request = new UpdateItemRequest
        {
            TableName = "Counters",
            Key = new Dictionary<string, AttributeValue>
            {
                { "CounterName", new AttributeValue { S = "UserIdCounter"} }
            },
            UpdateExpression = "SET CurrentValue = CurrentValue + :inc",
            ExpressionAttributeValues = new Dictionary<string, AttributeValue>
            {
                { ":inc", new AttributeValue { N = "1" } }
            },
            ReturnValues = "UPDATED_NEW"
        };
        var response = await _client.UpdateItemAsync(request);
        var nextId = int.Parse(response.Attributes["CurrentValue"].N);
        return nextId;
    }

    public async Task SaveRefreshToken(UserRefreshToken token) => await _context.SaveAsync(token);
    public async Task<UserRefreshToken> GetRefreshToken(string tokenId) => await _context.LoadAsync<UserRefreshToken>(tokenId);
    public async Task<UserInfo> GetUserInfo(int userId) => await _context.LoadAsync<UserInfo>(userId);

    public async Task<List<UserInfo>> GetAllUsers()
    {
        var scanConditions = new List<ScanCondition>();
        var users = await _context.ScanAsync<UserInfo>(scanConditions).GetRemainingAsync();
        return users;
    }

    public async Task<List<UserTask>> GetUserTasks(int userId) => await _context.QueryAsync<UserTask>(userId).GetRemainingAsync();
    public async Task<List<UserExpense>> GetUserExpenses(int userId) => await _context.QueryAsync<UserExpense>(userId).GetRemainingAsync();
    public async Task<List<UserSchedule>> GetUserSchedules(int userId) => await _context.QueryAsync<UserSchedule>(userId).GetRemainingAsync();
    public async Task<List<UserBankAccount>> GetUserBankAccounts(int userId) => await _context.QueryAsync<UserBankAccount>(userId).GetRemainingAsync();

    public async Task PostUserInfo(UserInfo user) => await _context.SaveAsync(user);
    public async Task PostUserBankAccountInfo(UserBankAccount user) => await _context.SaveAsync(user);

    public async Task DeleteUserInfo(int userId)
    {
        var user = await _context.LoadAsync<UserInfo>(userId);
        if (user != null)
        {
            await _context.DeleteAsync(user);
        }
    }

    public async Task SaveUserBankAccountInfo(UserBankAccount account) => await _context.SaveAsync(account);
    public async Task DeleteUserBankAccountInfo(UserBankAccount account) => await _context.DeleteAsync(account);
    public async Task PostUserExpenseInfo(UserExpense expense) => await _context.SaveAsync(expense);
    public async Task SaveUserExpenseInfo(UserExpense expense) => await _context.SaveAsync(expense);
    public async Task DeleteUserExpenseInfo(UserExpense expense) => await _context.DeleteAsync(expense);
    public async Task PostUserTaskInfo(UserTask task) => await _context.SaveAsync(task);
    public async Task SaveUserTaskInfo(UserTask task) => await _context.SaveAsync(task);
    public async Task DeleteUserTaskInfo(UserTask task) => await _context.DeleteAsync(task);
    public async Task PostUserScheduleInfo(UserSchedule schedule) => await _context.SaveAsync(schedule);
    public async Task SaveUserScheduleInfo(UserSchedule schedule) => await _context.SaveAsync(schedule);
    public async Task DeleteUserScheduleInfo(UserSchedule schedule) => await _context.DeleteAsync(schedule);
}