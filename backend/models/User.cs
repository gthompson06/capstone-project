using Amazon.DynamoDBv2.DataModel;

[DynamoDBTable("User")]
public class User {

    [DynamoDBHashKey] public required string UserName {get;set;}

    [DynamoDBProperty] public required string Email {get;set;}

    [DynamoDBProperty] public required string FirstName {get;set;}

    [DynamoDBProperty] public required string LastName {get;set;}

    [DynamoDBProperty] public required string DateOfBirth {get;set;}

    [DynamoDBProperty] public required string Password {get;set;}

    [DynamoDBProperty] public required List<Task> Tasks {get;set;} = [];  

    [DynamoDBProperty] public required List<Expense> Expenses {get;set;} = []; 

    [DynamoDBProperty] public required List<BankAccount> BankAccounts {get;set;} = []; 

    [DynamoDBProperty] public required List<Schedule> Schedule {get;set;} = []; 
}