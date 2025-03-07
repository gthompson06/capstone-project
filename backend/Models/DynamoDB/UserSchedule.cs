using Amazon.DynamoDBv2.DataModel;

[DynamoDBTable("Schedules")]
public class UserSchedule {

    [DynamoDBHashKey] public required int ScheduleId {get;set;}

    [DynamoDBRangeKey] public required string UserName {get;set;}

    [DynamoDBProperty] public required string Title {get;set;}

    [DynamoDBProperty] public required string Description {get;set;}

    [DynamoDBProperty] public required string Type {get;set;}
    
    [DynamoDBProperty] public required string Frequency {get;set;}

    [DynamoDBProperty] public required string StartTime {get;set;}

    [DynamoDBProperty] public required string EndTime {get;set;}

    [DynamoDBProperty] public required List<string> Days {get;set;}
}