namespace DTOs.ExpenseDTO;
public class ExpenseDTO
{
    public required int UserId {set;get;}
    public required int ExpenseId {set;get;}
    public required string Title {set;get;}
    public required string Type {set;get;}
    public required string Frequency {set;get;}
    public required DateTime PayDate {set;get;}
    public required decimal Amount {set;get;}
}