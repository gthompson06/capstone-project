using Amazon.DynamoDBv2.DataModel;

[DynamoDBTable("BankAccounts")]
public class UserBankAccount {
    [DynamoDBHashKey("UserId")] public required int UserId {get;set;}
    [DynamoDBRangeKey("AccountId")] public required int AccountId {get;set;}
    [DynamoDBProperty("Title")] public required string Title {get;set;}
    [DynamoDBProperty("Description")] public required string Description {get;set;}
    [DynamoDBProperty("Type")] public required string Type {get;set;}
    [DynamoDBProperty("Balance")] public required decimal Balance {get;set;}

}