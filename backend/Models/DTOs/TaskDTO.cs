namespace DTOs.TaskDTO; 
public class TaskDTO
{
    public required int UserId {set;get;}
    public required int TaskId {set;get;}
    public required string Title {set;get;}
    public required string Description {set;get;}
    public required string Type {set;get;}
    public required bool HasDueDate {set;get;}
    public required DateTime DueDate {set;get;}
    public required bool HasStartAndEnd {set;get;}
    public required DateTime StartDate {set;get;}
    public required DateTime EndDate {set;get;}
    public required bool IsCompleted {set;get;}
    public required int Order {set;get;}
}