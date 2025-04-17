using Amazon.DynamoDBv2.DataModel;

[DynamoDBTable("RefreshTokens")]
public class UserRefreshToken
{
    [DynamoDBHashKey]
    public required string TokenId { get; set; }

    public required int UserId { get; set; }

    public required DateTime ExpiresAt { get; set; }

    public required bool IsExpired { get; set; }
}