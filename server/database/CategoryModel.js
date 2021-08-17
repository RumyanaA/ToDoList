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
    static async getAllCat(userid){
        try{
            var catArray=[];
            var query={
                createdby: userid
            }
            var result = await client.get().collection('Categories').find(query).toArray()
            for (var i=0; i<result.length;i++){
                catArray.push({
                    name: result[i].name,
                    note: result[i].note,
                    id: result[i]._id,
                    
                })
            }
            return (catArray);

        }catch(e){
            logger.error(e.message);
        }
    }
}
module.exports = CategoryModel;