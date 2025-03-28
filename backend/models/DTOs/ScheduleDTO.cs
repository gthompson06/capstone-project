namespace DTOs.ScheduleDTO;
public class ScheduleDTO
{
    public required int UserId {set;get;}
    public required int ScheduleId {set;get;}
    public required string Title {set;get;}
    public required string Description {set;get;}
    public required string Frequency {set;get;}
    public required DateTime StartTime {set;get;}
    public required DateTime EndTime {set;get;}
    public required List<string> DaysOfWeek {set;get;}
}