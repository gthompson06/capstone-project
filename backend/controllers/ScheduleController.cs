using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("schedule")]

public class ScheduleController : ControllerBase
{
    public readonly ScheduleService _scheduleService;
    public ScheduleController(ScheduleService scheduleService)
    {
        _scheduleService = scheduleService;
    }
    [HttpGet("")]
    public IActionResult Load()
    {
        return Ok(new { Message = "Schedules" });
    }
    [HttpGet("{userId}")]
    public async Task<IActionResult> GetUserSchedules(int userId)
    {
        var response = await _scheduleService.GetScheduleInfo(userId);
        if (response == null)
        {
            return NotFound(new { Message = "404: No schedules found" });
        }
        else
        {
            return Ok(response);
        }
    }
    [HttpPost]
    public async Task<IActionResult> CreateSchedule([FromBody] UserSchedule newSchedule)
    {
        await _scheduleService.PostScheduleInfo(newSchedule);
        return CreatedAtAction(nameof(GetUserSchedules), new { userId = newSchedule.UserId }, newSchedule);
    }
    [HttpPut("{userId}/{scheduleId}")]
    public async Task<IActionResult> UpdateSchedule(int userId, int scheduleId, [FromBody] UserSchedule updatedSchedule)
    {
        var response = await _scheduleService.GetScheduleInfo(userId);
        var userSchedule = response.FirstOrDefault(a => a.ScheduleId == scheduleId);
        if (userSchedule == null)
        {
            return NotFound(new { Message = "404: Schedule not found" });
        }
        userSchedule.Title = updatedSchedule.Title;
        userSchedule.Description = updatedSchedule.Description;
        userSchedule.Type = updatedSchedule.Type;
        userSchedule.Frequency = updatedSchedule.Frequency;
        userSchedule.StartTime = updatedSchedule.StartTime;
        userSchedule.EndTime = updatedSchedule.EndTime;
        // userSchedule.Days = updatedSchedule.Days;

        await _scheduleService.UpdateScheduleInfo(userSchedule);
        return Ok(userSchedule);
    }
    [HttpDelete("{userId}/{scheduleId}")]
    public async Task<IActionResult> DeleteSchedule(int userId, int scheduleId)
    {
        var response = await _scheduleService.GetScheduleInfo(userId);
        var userSchedule = response.FirstOrDefault(a => a.ScheduleId == scheduleId);
        if (userSchedule == null)
        {
            return NotFound(new { Message = "404: Schedule not found" });
        }
        else
        {
            await _scheduleService.DeleteScheduleInfo(userSchedule);
            return NoContent();
        }

    }
}