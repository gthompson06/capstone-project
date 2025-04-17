public class TaskService
{
    private readonly Database _database;
    public TaskService(Database database)
    {
        _database = database;
    }

    public async Task<List<UserTask>> GetTaskInfo(int userId)
    {
        var task = await _database.GetUserTasks(userId);
        return task;
    }
    public async Task PostTaskInfo(UserTask task)
    {
        // Might need to validate if user exists already

        await _database.PostUserTaskInfo(task);
    }
    public async Task UpdateTaskInfo(UserTask task)
    {
        await _database.SaveUserTaskInfo(task);
    }
    public async Task DeleteTaskInfo(UserTask task)
    {
        await _database.DeleteUserTaskInfo(task);
    }

}