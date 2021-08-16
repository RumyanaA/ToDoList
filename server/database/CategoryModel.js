const client = require('./../config/dbConnect');
var logger = require('./../services/LoggingService.js');

class CategoryModel{
    static async addCategory(category){
        try{
            var result = await  client.get().collection("Categories").insertOne(category)
            return (result.insertedId.toString());
        }catch(e){
            logger.error(e.message);
        }
    }
}
module.exports = CategoryModel;