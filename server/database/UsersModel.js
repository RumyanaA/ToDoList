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
            //txt.
        }
        // db.close();

    }
    static async verifyUser(userData){
        try{
            var result= await client.get().collection("Users").find(userData).toArray()
            if(result.length==1){
                return (result[0]._id);
            }else{
                return -1;
            }
        }
        catch(e){
            logger.error(e.message);
        }
    }
}
module.exports=UsersModel;