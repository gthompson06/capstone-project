using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using DotNetEnv;
using System.IdentityModel.Tokens.Jwt;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

var awsAccessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID");
var awsSecretKey = Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY");
var awsRegion = Environment.GetEnvironmentVariable("AWS_REGION") ?? "us-east-1";
var region = RegionEndpoint.GetBySystemName(awsRegion);

var dynamoDbClient = new AmazonDynamoDBClient(
    new Amazon.Runtime.BasicAWSCredentials(awsAccessKey, awsSecretKey),
    region
);

builder.Services.AddSingleton<IAmazonDynamoDB>(dynamoDbClient);
builder.Services.AddSingleton<IDynamoDBContext>(new DynamoDBContext(dynamoDbClient));
builder.Services.AddSingleton(new DynamoDBOperationConfig { IndexName = "UserName-index" });

builder.Services.AddSingleton<JwtSecurityTokenHandler>();

builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<Database>();
builder.Services.AddScoped<PasswordService>();
builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<BankAccountService>();
builder.Services.AddScoped<ExpenseService>();
builder.Services.AddScoped<TaskService>();
builder.Services.AddScoped<ScheduleService>();
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowCORS", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowCORS");
app.MapControllers();

app.Run();