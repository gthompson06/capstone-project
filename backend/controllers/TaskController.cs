using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("tasks")]

public class TaskController : ControllerBase
{
    public readonly TaskService _taskService;
    public TaskController(TaskService taskService)
    {
        _taskService = taskService;
    }
    [HttpGet("")]
    public IActionResult Load()
    {
        return Ok(new { Message = "Tasks" });
    }
    [HttpGet("{userId}")]
    public async Task<IActionResult> GetUserTasks(int userId)
    {
        var response = await _taskService.GetTaskInfo(userId);
        if (response == null)
        {
            return NotFound(new { Message = "404: Task not found" });
        }
        else
        {
            return Ok(response);
        }
    }
    [HttpPost("{userId}")]
    public async Task<IActionResult> CreateTask([FromBody] UserTask newTask)
    {
        await _taskService.PostTaskInfo(newTask);
        return CreatedAtAction(nameof(GetUserTasks), new { userId = newTask.UserId }, newTask);
    }
    [HttpPut("{userId}/{taskId}")]
    public async Task<IActionResult> UpdateTask(int userId, int taskId, [FromBody] UserTask updatedTask)
    {
        var response = await _taskService.GetTaskInfo(userId);
        var userTask = response.FirstOrDefault(a => a.TaskId == taskId);
        if (userTask == null)
        {
            return NotFound(new { Message = "404: Task not found" });
        }
        userTask.Title = updatedTask.Title;
        userTask.Description = updatedTask.Description;
        userTask.Type = updatedTask.Type;
        userTask.HasDueDate = updatedTask.HasDueDate;
        userTask.DueDate = updatedTask.DueDate;
        userTask.HasStartAndEnd = updatedTask.HasStartAndEnd;
        userTask.StartDate = updatedTask.StartDate;
        userTask.EndDate = updatedTask.EndDate;
        userTask.Order = updatedTask.Order;

        await _taskService.UpdateTaskInfo(userTask);
        return Ok(userTask);
    }
    [HttpDelete("{userId}/{taskId}")]
    public async Task<IActionResult> DeleteTask(int userId, int taskId)
    {
        var response = await _taskService.GetTaskInfo(userId);
        var userTask = response.FirstOrDefault(a => a.TaskId == taskId);
        if (userTask == null)
        {
            return NotFound(new { Message = "404: Expense not found" });
        }
        else
        {
            await _taskService.DeleteTaskInfo(userTask);
            return NoContent();
        }

    }
}