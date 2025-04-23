public class ScheduleService
{
    private readonly Database _database;
    public ScheduleService(Database database)
    {
        _database = database;
    }

    public async Task<List<UserSchedule>> GetScheduleInfo(int userId)
    {
        var schedule = await _database.GetUserSchedules(userId);
        return schedule;
    }
    public async Task PostScheduleInfo(UserSchedule schedule)
    {

        await _database.PostUserScheduleInfo(schedule);
    }
    public async Task UpdateScheduleInfo(UserSchedule schedule)
    {
        await _database.SaveUserScheduleInfo(schedule);
    }
    public async Task DeleteScheduleInfo(UserSchedule schedule)
    {
        await _database.DeleteUserScheduleInfo(schedule);
    }

}