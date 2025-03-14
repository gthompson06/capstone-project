using Amazon.DynamoDBv2.DataModel;

[DynamoDBTable("Tasks")]
public class UserTask
{
    [DynamoDBHashKey("UserId")] public required int UserId {get;set;}
    [DynamoDBRangeKey("TaskId")] public required int TaskId {get;set;}
    [DynamoDBProperty("Title")] public required string Title {get;set;}
    [DynamoDBProperty("Description")] public required string Description {get;set;}
    [DynamoDBProperty("Type")] public required string Type {get;set;}
    [DynamoDBProperty("HasDueDate")] public required bool HasDueDate {get;set;}
    [DynamoDBProperty("DueDate")] public string? DueDate {get;set;}
    [DynamoDBProperty("HasStartAndEnd")] public required bool HasStartAndEnd {get;set;}
    [DynamoDBProperty("StartDate")] public string? StartDate {get;set;}
    [DynamoDBProperty("EndDate")] public string? EndDate {get;set;}
    [DynamoDBProperty("Order")] public required int Order {get;set;}
}