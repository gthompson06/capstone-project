namespace DTOs.TaskDTO;
public class TaskDTO
{
    public int UserId {set;get;}
    public int TaskId {set;get;}
    public string Title {set;get;}
    public string Description {set;get;}
    public string Type {set;get;}
    public bool HasDueDate {set;get;}
    public DateTime DueDate {set;get;}
    public bool HasStartAndEnd {set;get;}
    public DateTime StartDate {set;get;}
    public DateTime EndDate {set;get;}
    public bool IsCompleted {set;get;}
    public int Order {set;get;}
}