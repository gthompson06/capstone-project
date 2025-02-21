using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading.Tasks;

var builder = WebApplication.CreateBuilder(args);

// Get ConfigurationManager from Microsoft Extension
var config = builder.Configuration;

// Get region from configuration file
var awsRegion = config["AWS:Region"] ?? "us-east-1";

// Set region for AWS SDK
var region = RegionEndpoint.GetBySystemName(awsRegion);

// Setup AWS DynamoDB client (lower-level interaction with database)
var dynamoDbClient = new AmazonDynamoDBClient(RegionEndpoint.GetBySystemName(awsRegion));

// Add client to app services
builder.Services.AddSingleton<IAmazonDynamoDB>(dynamoDbClient);

// Add higher-level database interaction object to app services
builder.Services.AddSingleton<IDynamoDBContext>(new DynamoDBContext(dynamoDbClient));

// Allow Cross-Origin Resource Sharing (CORS) from anywhere to allow requests from React Native
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowCORS",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

var app = builder.Build();

app.UseCors("AllowCORS"); // Apply CORS globally

app.Run();