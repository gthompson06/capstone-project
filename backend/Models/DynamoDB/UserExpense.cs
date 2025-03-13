using Amazon.DynamoDBv2.DataModel;

[DynamoDBTable("Expenses")]
public class UserExpense {
    [DynamoDBHashKey("UserId")] public required int UserId {get;set;}
    [DynamoDBRangeKey("ExpenseId")] public required int ExpenseId {get;set;}
    [DynamoDBProperty("Title")] public required string Title {get;set;}
    [DynamoDBProperty("Frequency")] public required string Frequency {get;set;}
    [DynamoDBProperty("Type")] public required string Type {get;set;}
    [DynamoDBProperty("Amount")] public required decimal Amount {get;set;}
    [DynamoDBProperty("PayDate")] public required string PayDate {get;set;}
}