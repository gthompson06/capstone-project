using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
public class TokenService
{
    private readonly Database _database;
    private readonly JwtSecurityTokenHandler _tokenHandler;
    public TokenService(Database database, JwtSecurityTokenHandler tokenHandler)
    {
        _database = database;
        _tokenHandler = tokenHandler;
    }

    public string GenerateAccessToken(string userName)
    {
        var secret = Environment.GetEnvironmentVariable("JWT_KEY");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var issuer = Environment.GetEnvironmentVariable("JWT_ISSUER");
        var audience = Environment.GetEnvironmentVariable("JWT_AUDIENCE");
        var expiration = DateTime.UtcNow.AddMinutes(double.Parse(Environment.GetEnvironmentVariable("JWT_ACCESS_DURATION_MINUTES")));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, userName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: expiration,
            signingCredentials: creds
        );

        return _tokenHandler.WriteToken(token);
    }

    public async Task<string> GenerateRefreshTokenAsync(int userId)
    {
        var tokenId = Guid.NewGuid().ToString();
        var token = new UserRefreshToken
        {
            TokenId = tokenId,
            UserId = userId,
            ExpiresAt = DateTime.UtcNow.AddDays(double.Parse(Environment.GetEnvironmentVariable("JWT_REFRESH_DURATION_DAYS"))),
            IsExpired = false
        };
        await _database.SaveRefreshToken(token);
        return tokenId;
    }

    public async Task<bool> ValidateRefreshTokenAsync(string tokenId, int userId)
    {
        var token = await _database.GetRefreshToken(tokenId);
        if(token.ExpiresAt <= DateTime.UtcNow)
        {
            await ExpireToken(token);
        }
        if (token == null || token.IsExpired || token.UserId != userId)
            return false;

        return true;
    }

    public async Task ExpireToken(UserRefreshToken token)
    {
        if (token != null)
        {
            token.IsExpired = true;
            await _database.SaveRefreshToken(token);
        }
    }

}