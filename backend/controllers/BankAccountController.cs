using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("accounts")]
public class BankAccountController : ControllerBase
{
    public readonly BankAccountService _bankAccountService;

    public BankAccountController(BankAccountService bankAccountService)
    {
        _bankAccountService = bankAccountService;
    }
    [HttpGet("")]
    public IActionResult Load()
    {
        return Ok(new { Message = "BankAccounts" });
    }
    [HttpGet("{userId}")]
    public async Task<IActionResult> GetUserBankAccounts(int userId)
    {
        var response = await _bankAccountService.GetBankAccountInfo(userId);
        if (response == null)
        {
            return NotFound(new { Message = "404: Account not found" });
        }
        else
        {
            return Ok(response);
        }
    }
    [HttpPost]
    public async Task<IActionResult> CreateBankAccount([FromBody] UserBankAccount newAccount)
    {
        await _bankAccountService.PostBankAccountInfo(newAccount);
        return CreatedAtAction(nameof(GetUserBankAccounts), new { userId = newAccount.UserId }, newAccount);
    }
    [HttpPut("{userId}/{accountId}")]
    public async Task<IActionResult> UpdateBankAccount(int userId, int accountId, [FromBody] UserBankAccount updatedAccount)
    {
        var response = await _bankAccountService.GetBankAccountInfo(userId);

        var userAccount = response.FirstOrDefault(a => a.AccountId == accountId);
        if (userAccount == null)
        {
            return NotFound(new { Message = "Bank account not found" });
        }
        userAccount.Title = updatedAccount.Title;
        userAccount.Description = updatedAccount.Description;
        userAccount.Type = updatedAccount.Type;
        userAccount.Balance = updatedAccount.Balance;

        await _bankAccountService.UpdateBankAccountInfo(userAccount);
        return Ok(userAccount);
    }
    [HttpDelete("{userId}/{accountId}")]
    public async Task<IActionResult> DeleteBankAccount(int userId, int accountId)
    {
        var response = await _bankAccountService.GetBankAccountInfo(userId);
        var userAccount = response.FirstOrDefault(a => a.AccountId == accountId);
        if (userAccount == null)
        {
            return NotFound(new { Message = "404: Bank account not found" });
        }
        else
        {
            await _bankAccountService.DeleteBankAccountInfo(userAccount);
            return NoContent();
        }

    }
}