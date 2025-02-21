using Amazon.DynamoDBv2.DataModel;
using System.Collections.Generic;

namespace UserModel {
    
    [DynamoDBTable("Users")]
    public class User {

        [DynamoDBHashKey]
        public string UserID {get;set;}

        [DynamoDBRangeKey]
        public DateTime CreationDate {get;set;}




        [DynamoDBProperty]
        public List<UserTask> UserTasks {get;set;} = new List<UserTask>();  
    }
    
    public class UserTask {

    }
}