using Amazon.DynamoDBv2.DataModel;
using System.Collections.Generic;
namespace backend.entities;
public class User
{
    public string UserName { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string DateOfBirth { get; set; }
    public string Password { get; set; }
}
// namespace UserModel {

//     [DynamoDBTable("Users")]
//     public class User {

//         [DynamoDBHashKey]
//         public string UserName {get;set;}

//         [DynamoDBRangeKey]
//         public DateTime CreationDate {get;set;}




//         [DynamoDBProperty]
//         public List<UserTask> UserTasks {get;set;} = new List<UserTask>();  
//     }
    
//     public class UserTask {

//     }
// }