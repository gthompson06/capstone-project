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

// Add Services

// Database client
builder.Services.AddSingleton<IAmazonDynamoDB>(dynamoDbClient);

// Higher-level database interaction object to app services
builder.Services.AddSingleton<IDynamoDBContext>(new DynamoDBContext(dynamoDbClient));
builder.Services.AddSingleton(new DynamoDBOperationConfig{ IndexName = "UserName-index" });

// Add built-in services
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<Database>();
builder.Services.AddScoped<PasswordService>();
builder.Services.AddScoped<BankAccountService>();
builder.Services.AddScoped<ExpenseService>();
builder.Services.AddScoped<TaskService>();
builder.Services.AddScoped<ScheduleService>();
builder.Services.AddControllers();

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

// Middleware
app.UseCors("AllowCORS"); // Apply CORS globally
app.MapControllers();

app.Run();