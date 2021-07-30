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
}
module.exports=UsersModel;