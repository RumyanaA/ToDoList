const client=require('./../config/dbConnect');
var logger = require('./../services/LoggingService.js');
class UsersModel {
   static async addUser(userData) {

        
        // var db=client.db;
        try {
            var result = await client.get().collection("Users").insertOne(userData)

            return (result.insertedId.toString());
        }
        catch (e) {
            logger.error(e.message);
            if (e.message.includes("email")){
                return "e.email";
            }else if(e.message.includes("username")){
                return "e.username";
            }
            
            //txt.
        }
        

    }
    static async verifyUser(userData){
        try{
            var result= await client.get().collection("Users").find(userData).toArray()
            if(result.length==1){
                return (result[0]._id);
            }else{
                return '-1';
            }
        }
        catch(e){
            logger.error(e.message);
        }
    }
}
module.exports=UsersModel;