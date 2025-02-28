using Microsoft.AspNetCore.Mvc;
using UserModel;

public interface IUserService {
    public Task<string> GetFirstNameByUserName(string userName);
}

public class UserService : IUserService {
    private readonly Interaction _interaction;
    public UserService(Interaction interaction){
        _interaction = interaction;
    }
    public async Task<string> GetFirstNameByUserName(string userName){
        var user = await _interaction.GetUserById(userName);
        if(user == null) return null;
        return user.UserName;
    }
}