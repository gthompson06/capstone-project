using Amazon.DynamoDBv2.DataModel;

[DynamoDBTable("BankAccounts")]
public class BankAccount {

    [DynamoDBHashKey] public required int AccountId {get;set;}

    [DynamoDBRangeKey] public required string UserName {get;set;}

    [DynamoDBProperty] public required string Title {get;set;}

    [DynamoDBProperty] public required string Description {get;set;}

    [DynamoDBProperty] public required string Type {get;set;}
    
    [DynamoDBProperty] public required decimal Balance {get;set;}

}