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
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

// Get ConfigurationManager from Microsoft Extension
var config = builder.Configuration;

// Load environment variables (database credentials)
Env.Load();

// Get AWS credentials and region from environment variables
var awsAccessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID");
var awsSecretKey = Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY");
var awsRegion = Environment.GetEnvironmentVariable("AWS_REGION") ?? "us-east-1";

// Set AWS region
var region = RegionEndpoint.GetBySystemName(awsRegion);

// Create AWS DynamoDB client with credentials and region
var dynamoDbClient = new AmazonDynamoDBClient(
    new Amazon.Runtime.BasicAWSCredentials(awsAccessKey, awsSecretKey),
    region
);

// Add client to app services
builder.Services.AddSingleton<IAmazonDynamoDB>(dynamoDbClient);

// Add higher-level database interaction object to app services
builder.Services.AddSingleton<IDynamoDBContext>(new DynamoDBContext(dynamoDbClient));

// Add app services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<Database>();



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

builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowCORS"); // Apply CORS globally

// Routes using http will automatically redirect to https (more secure)
app.UseHttpsRedirection();

app.MapControllers();

app.Run();