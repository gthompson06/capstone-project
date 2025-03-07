using Amazon.DynamoDBv2.DataModel;

[DynamoDBTable("Tasks")]
public class UserTask {

    [DynamoDBHashKey] public required int TaskId {get;set;}

    [DynamoDBRangeKey] public required string UserName {get;set;}

    [DynamoDBProperty] public required string Title {get;set;}

    [DynamoDBProperty] public required string Description {get;set;}

    [DynamoDBProperty] public required string Type {get;set;}

    [DynamoDBProperty] public required bool HasDueDate {get;set;}

    [DynamoDBProperty] public string? DueDate {get;set;}

    [DynamoDBProperty] public required bool HasStartAndEnd {get;set;}
    
    [DynamoDBProperty] public string? StartDate {get;set;}

    [DynamoDBProperty] public string? EndDate {get;set;}
    
    [DynamoDBProperty] public required int Order {get;set;}
}