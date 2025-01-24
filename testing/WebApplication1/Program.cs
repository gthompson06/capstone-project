// var builder = WebApplication.CreateBuilder(args);
// var app = builder.Build();

// app.MapGet("/", () => "Hello World!");

// app.Run();

using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;

class Program
{
    static async Task Main(string[] args)
    {
        var config = new AmazonDynamoDBConfig
        {
            RegionEndpoint = Amazon.RegionEndpoint.USEast1 // Set your region
        };

        using var client = new AmazonDynamoDBClient(config);

        try
        {
            // List all tables
            Console.WriteLine("Listing DynamoDB tables:");
            var listTablesResponse = await client.ListTablesAsync();
            foreach (var table in listTablesResponse.TableNames)
            {
                Console.WriteLine($" - {table}");
            }

            // Query a specific table
            string specificTableName = "User"; // Use a unique variable name
            Console.WriteLine($"\nQuerying table: {specificTableName}");
            var scanResponse = await client.ScanAsync(new ScanRequest { TableName = specificTableName });

            foreach (var item in scanResponse.Items)
            {
                string userId = item["UserID"].N;
                string fname = item["FirstName"].S;
                string lname = item["LastName"].S;
                string email = item["Email"].S;
                string dob = item["DateOfBirth"].S;

                Console.WriteLine($"UserId: {userId}, FName: {fname}, Lname: {lname} Email: {email} DOB: {dob}");
                Console.WriteLine();
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }
}
