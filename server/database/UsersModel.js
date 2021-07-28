var dbConnect = require('./../config/dbConnect.js');
var logger = require('./../services/LoggingService.js');
class UsersModel {
    async addUser(userData) {

        var db = dbConnect();
        try {
            var result = await db.collection("Users").insertOne(userData)
            return (result[length - 1]._id);
        }
        catch (e) {
            logger.error(e.message);
            //txt.
        }
        db.close();

    }
}
module.exports=UsersModel;