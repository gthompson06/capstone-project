namespace DTOs.ScheduleDTO;
public class ScheduleDTO
{
    public int UserId {set;get;}
    public int ScheduleId {set;get;}
    public string Title {set;get;}
    public string Description {set;get;}
    public string Frequency {set;get;}
    public DateTime StartTime {set;get;}
    public DateTime EndTime {set;get;}
    public List<string> DaysOfWeek {set;get;}
}