namespace DTOs.BankAccountDTO;
public class BankAccountDTO
{
    public int UserId {get;set;}
    public int AccountId {get;set;}
    public string Title {get;set;}
    public string Description {get;set;}
    public string Type {get;set;}
    public decimal Balance {get;set;}
}