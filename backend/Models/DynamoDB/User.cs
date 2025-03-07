using Amazon.DynamoDBv2.DataModel;

[DynamoDBTable("Users")]
public class User {

    [DynamoDBHashKey] public required string UserName {get;set;}

    [DynamoDBProperty] public required string Email {get;set;}

    [DynamoDBProperty] public string? FirstName {get;set;}

    [DynamoDBProperty] public string? LastName {get;set;}

    [DynamoDBProperty] public string? DateOfBirth {get;set;}

    [DynamoDBProperty] public string? City {get;set;}

    [DynamoDBProperty] public string? State {get;set;}

    [DynamoDBProperty] public string? School {get;set;}

    [DynamoDBProperty] public required string HashedPassword {get;set;}
}