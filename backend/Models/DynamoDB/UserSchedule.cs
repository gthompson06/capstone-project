using Amazon.DynamoDBv2.DataModel;

[DynamoDBTable("Schedules")]
public class UserSchedule {
    [DynamoDBHashKey("UserId")] public required int UserId {get;set;}
    [DynamoDBRangeKey("ScheduleId")] public required int ScheduleId {get;set;}
    [DynamoDBProperty("Title")] public required string Title {get;set;}
    [DynamoDBProperty("Description")] public required string Description {get;set;}
    [DynamoDBProperty("Type")] public required string Type {get;set;}
    [DynamoDBProperty("Frequency")] public required string Frequency {get;set;}
    [DynamoDBProperty("StartTime")] public required string StartTime {get;set;}
    [DynamoDBProperty("EndTime")] public required string EndTime {get;set;}
    [DynamoDBProperty("Days")] public required List<string> Days {get;set;}
}