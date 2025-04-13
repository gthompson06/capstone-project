public class ResetPasswordDTO
{
    public string UserName { get; set; }
    public string SecurityAnswer { get; set; }
    public string NewPassword { get; set; }
}