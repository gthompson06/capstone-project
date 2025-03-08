using System.Globalization;
using Amazon.DynamoDBv2.DataModel;

[DynamoDBTable("Users")]
public class UserInfo {
    [DynamoDBHashKey("UserId")] public required int UserId {get;set;}
    [DynamoDBProperty("UserName")] public required string UserName {get;set;}
    [DynamoDBProperty("Email")] public required string Email {get;set;}
    [DynamoDBProperty("FirstName")] public string? FirstName {get;set;}
    [DynamoDBProperty("LastName")] public string? LastName {get;set;}
    [DynamoDBProperty("DateOfBirth")] public string? DateOfBirth {get;set;}
    [DynamoDBProperty("City")] public string? City {get;set;}
    [DynamoDBProperty("State")] public string? State {get;set;}
    [DynamoDBProperty("School")] public string? School {get;set;}
    [DynamoDBProperty("HashedPassword")] public required string HashedPassword {get;set;}
}