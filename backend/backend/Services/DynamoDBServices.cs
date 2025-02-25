using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
// using System;
// using System.Collections.Generic;
// using System.Threading.Tasks;
using backend.entities;

namespace backend.Services
{
    public class DynamoDbService
    {
        private readonly AmazonDynamoDBClient _dynamoDbClient;

        public DynamoDbService()
        {
            _dynamoDbClient = new AmazonDynamoDBClient(); // Will use default credentials
        }

        // public async Task CreateTableAsync()
        // {
        //     var request = new CreateTableRequest
        //     {
        //         TableName = "User",
        //         KeySchema = new List<KeySchemaElement>
        //         {
        //             new KeySchemaElement("UserId", KeyType.HASH)  // Primary key
        //         },
        //         AttributeDefinitions = new List<AttributeDefinition>
        //         {
        //             new AttributeDefinition("UserId", ScalarAttributeType.S)
        //         },
        //         ProvisionedThroughput = new ProvisionedThroughput(5, 5)
        //     };

        //     var response = await _dynamoDbClient.CreateTableAsync(request);
        //     Console.WriteLine("Table Created: " + response.TableDescription.TableName);
        // }

        public async Task InsertItemAsync(string userName, string firstName, string lastName, string dateOfBirth, string email, string password)
        {
            var request = new PutItemRequest
            {
                TableName = "User",
                Item = new Dictionary<string, AttributeValue>
                {
                    { "UserName", new AttributeValue { S = userName } },
                    { "FirstName", new AttributeValue { S = firstName } },
                    { "LastName", new AttributeValue { S = lastName } },
                    { "DateOfBirth", new AttributeValue { S = dateOfBirth } },
                    { "Email", new AttributeValue { S = email } },
                    { "Password", new AttributeValue { S = password } }
                }
            };

            await _dynamoDbClient.PutItemAsync(request);
            Console.WriteLine("Item Inserted: " + userName);
        }

        public async Task<User?> GetItemAsync(string userName)
        {
            var request = new GetItemRequest
            {
                TableName = "User", // DynamoDB table name
                Key = new Dictionary<string, AttributeValue>
            {
                { "UserName", new AttributeValue { S = userName } }
            }
            };

            var response = await _dynamoDbClient.GetItemAsync(request);

            if (response.Item != null && response.Item.Count > 0)
            {
                // Map the DynamoDB item to a User model
                var user = new User
                {
                    UserName = response.Item["UserName"].S,
                    FirstName = response.Item["FirstName"].S,
                    LastName = response.Item["LastName"].S,
                    Email = response.Item["Email"].S,
                    DateOfBirth = response.Item["DateOfBirth"].S,
                    Password = response.Item["Password"].S
                };
                return user;
            }

            return null;
        }


        //         public async Task UpdateItemAsync(string userId, string newName, int newAge)
        //         {
        //             var request = new UpdateItemRequest
        //             {
        //                 TableName = "Users",
        //                 Key = new Dictionary<string, AttributeValue>
        //                 {
        //                     { "UserId", new AttributeValue { S = userId } }
        //                 },
        //                 AttributeUpdates = new Dictionary<string, AttributeValueUpdate>
        //                 {
        //                     { "Name", new AttributeValueUpdate { Action = AttributeAction.PUT, Value = new AttributeValue { S = newName } } },
        //                     { "Age", new AttributeValueUpdate { Action = AttributeAction.PUT, Value = new AttributeValue { N = newAge.ToString() } } }
        //                 }
        //             };

        //             await _dynamoDbClient.UpdateItemAsync(request);
        //             Console.WriteLine("Item Updated: " + userId);
        //         }

        //         public async Task DeleteItemAsync(string userId)
        //         {
        //             var request = new DeleteItemRequest
        //             {
        //                 TableName = "Users",
        //                 Key = new Dictionary<string, AttributeValue>
        //                 {
        //                     { "UserId", new AttributeValue { S = userId } }
        //                 }
        //             };

        //             await _dynamoDbClient.DeleteItemAsync(request);
        //             Console.WriteLine("Item Deleted: " + userId);
        //         }
    }
}