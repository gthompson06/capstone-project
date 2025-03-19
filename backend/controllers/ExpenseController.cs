using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("expenses")]

public class ExpenseController : ControllerBase
{
    public readonly ExpenseService _expenseService;
    public ExpenseController(ExpenseService expenseService)
    {
        _expenseService = expenseService;
    }
    [HttpGet("")]
    public IActionResult Load()
    {
        return Ok(new { Message = "Expenses" });
    }
    [HttpGet("{userId}")]
    public async Task<IActionResult> GetUserExpenses(int userId)
    {
        var response = await _expenseService.GetExpenseInfo(userId);
        if (response == null)
        {
            return NotFound(new { Message = "404: Expense not found" });
        }
        else
        {
            return Ok(response);
        }
    }
    [HttpPost]
    public async Task<IActionResult> CreateExpense([FromBody] UserExpense newExpense)
    {
        await _expenseService.PostExpenseInfo(newExpense);
        return CreatedAtAction(nameof(GetUserExpenses), new { userId = newExpense.UserId }, newExpense);
    }
    [HttpPut("{userId}/{expenseId}")]
    public async Task<IActionResult> UpdateExpense(int userId, int expenseId, [FromBody] UserExpense updatedExpense)
    {
        var response = await _expenseService.GetExpenseInfo(userId);

        var userExpense = response.FirstOrDefault(a => a.ExpenseId == expenseId);
        if (userExpense == null)
        {
            return NotFound(new { Message = "404: Expense not found" });
        }
        userExpense.Title = updatedExpense.Title;
        userExpense.Frequency = updatedExpense.Frequency;
        userExpense.Type = updatedExpense.Type;
        userExpense.Amount = updatedExpense.Amount;
        userExpense.PayDate = updatedExpense.PayDate;

        await _expenseService.UpdateExpenseInfo(userExpense);
        return Ok(userExpense);
    }
    [HttpDelete("{userId}/{expenseId}")]
    public async Task<IActionResult> DeleteExpense(int userId, int expenseId)
    {
        var response = await _expenseService.GetExpenseInfo(userId);
        var userExpense = response.FirstOrDefault(a => a.ExpenseId == expenseId);
        if (userExpense == null)
        {
            return NotFound(new { Message = "404: Expense not found" });
        }
        else
        {
            await _expenseService.DeleteExpenseInfo(userExpense);
            return NoContent();
        }

    }
}