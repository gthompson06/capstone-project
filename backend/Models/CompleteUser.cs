public class CompleteUser {

    public required string UserName {get;set;}

    public required string Email {get;set;}

    public string? FirstName {get;set;}

    public string? LastName {get;set;}

    public string? DateOfBirth {get;set;}

    public string? City {get;set;}

    public string? State {get;set;}

    public string? School {get;set;}

    public required string HashedPassword {get;set;}

    public required List<Task> Tasks {get;set;} = [];  

    public required List<Expense> Expenses {get;set;} = []; 

    public required List<BankAccount> BankAccounts {get;set;} = []; 

    public required List<Schedule> Schedule {get;set;} = []; 
}