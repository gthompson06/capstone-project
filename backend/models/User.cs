public class User
{
    public required UserInfo UserInfo {get;set;}
    public List<UserTask>? Tasks {get;set;}
    public List<UserExpense>? Expenses {get;set;}
    public List<UserBankAccount>? BankAccounts {get;set;}
    public List<UserSchedule>? Schedules {get;set;}

}
