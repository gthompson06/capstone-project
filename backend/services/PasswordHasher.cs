using System.Security.Cryptography;

public interface IPasswordHasher
{
    string Hash(string password);
    bool Verify(string passwordHash, string inputPassword);
}

public class PasswordHasher : IPasswordHasher
{
    private const int SaltSize = 128 / 8;
    private const int KeySize = 256 / 8;
    private const int Iterations = 10000;
    private static readonly HashAlgorithmName hashAlgorithmName = hashAlgorithmName.SHA256;

    public string Hash(string password)
    {
        throw new NotImplementedException();
    }
    public bool Verify(string passwordHash, string inputPassword)
    {
        throw new NotImplementedException();
    }


}