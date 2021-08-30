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
    static async getTasks(userid){
        try{
            var tasksArray=[];
            var query={
                createdby: userid
            }
            var result = await client.get().collection('Tasks').find(query).toArray()
            for (var i=0; i<result.length;i++){
                tasksArray.push({
                    taskName: result[i].taskName,
                    taskDescr: result[i].taskDescr,
                    important: result[i].important,
                    dueDate: result[i].dueDate,
                    category: result[i].category,
                    id: result[i]._id,
                    
                })
            }
            return (tasksArray);

        }catch(e){
            logger.error(e.message);
        }
    }
}
module.exports = TaskModel;