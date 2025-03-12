using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("accounts")]
public class BankAccountController : ControllerBase
{
    public readonly BankAccountService _bankAccountService;

    public BankAccountController(BankAccountService bankAccountServiceService)
    {
        _bankAccountService = bankAccountServiceService;
    }
    [HttpGet("")]
    public IActionResult Load()
    {
        return Ok(new { Message = "Welcome" });
    }
    [HttpGet("{userId}")]
    public async Task<IActionResult> GetUserBankAccounts(int userId)
    {
        var response = await _bankAccountService.GetBankAccountInfo(userId);
        return Ok(response);
    }
    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] UserBankAccount newAccount)
    {
        await _bankAccountService.PostBankAccountInfo(newAccount);
        return CreatedAtAction(nameof(GetUserBankAccounts), new { userId = newAccount.UserId }, newAccount);
    }
}