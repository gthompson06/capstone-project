using Amazon.DynamoDBv2.DataModel;

[DynamoDBTable("Expenses")]
public class UserExpense {

    [DynamoDBHashKey] public required string ExpenseId {get;set;}

    [DynamoDBRangeKey] public required string UserName {get;set;}

    [DynamoDBProperty] public required string Title {get;set;}

    [DynamoDBProperty] public required string Frequency {get;set;}

    [DynamoDBProperty] public required string Type {get;set;}
    
    [DynamoDBProperty] public required decimal Amount {get;set;}

    [DynamoDBProperty] public required string PayDate {get;set;}

}