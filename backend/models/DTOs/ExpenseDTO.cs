namespace DTOs.ExpenseDTO;
public class ExpenseDTO
{
    public int UserId {set;get;}
    public int ExpenseId {set;get;}
    public string Title {set;get;}
    public string Type {set;get;}
    public string Frequency {set;get;}
    public DateTime PayDate {set;get;}
    public decimal Amount {set;get;}
}