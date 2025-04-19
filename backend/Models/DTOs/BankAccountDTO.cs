namespace DTOs.BankAccountDTO;
public class BankAccountDTO
{
    public required int UserId {get;set;}
    public required int AccountId {get;set;}
    public required string Title {get;set;}
    public required string Description {get;set;}
    public required string Type {get;set;}
    public required decimal Balance {get;set;}
}