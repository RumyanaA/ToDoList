const client=require('./../config/dbConnect');
var logger = require('./../services/LoggingService.js');
var bcrypt = require('bcryptjs');
class UsersModel {
   static async addUser(userData) {

        
        // var db=client.db;
        try {
            const passwordHash = bcrypt.hashSync(userData.password, 10);
            userData.password=passwordHash;
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
            var query={
                username: userData.username
            }
            var result= await client.get().collection("Users").find(query).toArray()
            if(result.length==1){
                const verified = bcrypt.compareSync(userData.password, result[0].password);
                if(verified==true){
                return (result[0]._id);
                }else{
                    return '-1';
                }
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