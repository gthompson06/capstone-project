public class CompleteUser{
    public required UserInfo UserInfo {get;set;}
    public List<UserTask> Tasks {get;set;}
    public List<UserExpense> Expenses {get;set;}
    public List<UserBankAccount> BankAccounts {get;set;}
    public List<UserSchedule> Schedule {get;set;}

    public CompleteUser(
        UserInfo user,
        List<UserTask>? tasks = null,
        List<UserExpense>? expenses = null,
        List<UserBankAccount>? bankAccounts = null,
        List<UserSchedule>? schedule = null
    )
    {
        UserInfo = user;
        Tasks = tasks ?? new List<UserTask>();
        Expenses = expenses ?? new List<UserExpense>();
        BankAccounts = bankAccounts ?? new List<UserBankAccount>();
        Schedule = schedule ?? new List<UserSchedule>();
    }
}
