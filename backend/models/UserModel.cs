using Amazon.DynamoDBv2.DataModel;

namespace UserModel {

    [DynamoDBTable("User")]
    public class User {

        [DynamoDBHashKey]
        public required string UserName {get;set;}

        [DynamoDBProperty]
        public required string Email {get;set;}

        [DynamoDBProperty]
        public required string FirstName {get;set;}

        [DynamoDBProperty]
        public required string LastName {get;set;}

        [DynamoDBProperty]
        public required string DateOfBirth {get;set;}

        [DynamoDBProperty]
        public required string Password {get;set;}

        // [DynamoDBProperty]
        // public List<UserTask> UserTasks {get;set;} = new List<UserTask>();  
    }
    
    // public class UserTask {

    // }
}