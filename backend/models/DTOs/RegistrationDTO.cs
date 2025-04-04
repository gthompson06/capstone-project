namespace requests.RegistrationDTO;
public class RegistrationDTO
{
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string SecurityQuestion { get; set; }
    public string SecurityAnswer { get; set; }
}