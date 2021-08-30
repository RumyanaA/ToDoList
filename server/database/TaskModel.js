const client = require('./../config/dbConnect');
var logger = require('./../services/LoggingService.js');
class TaskModel{
    static async addTask(taskData){
        try{
            var result = await  client.get().collection("Tasks").insertOne(taskData)
            return (result.insertedId.toString());
        }catch(e){
            logger.error(e.message);
        }
    }
}
module.exports = TaskModel;