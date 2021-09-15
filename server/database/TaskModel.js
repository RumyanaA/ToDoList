const client = require('./../config/dbConnect');
var logger = require('./../services/LoggingService.js');
class TaskModel{
    static async getDataforHomePage(userId,skipNum){
        try{
            var DataToReturn={
                tasks:[],
                numberOfPages: 0,
            }
            var query ={
                'createdby': userId
            }
            var totalTasksCount = await client.get().collection('Tasks').countDocuments(query)
            var tasksOnSelectedPage= await client.get().collection('Tasks').find(query, { projection: { 'createdby': 0 } }).sort({'dueDate':1}).skip(+skipNum).limit(9).toArray()
            if(totalTasksCount>0){
                var itemsPerPage=9;
                var pageNums=totalTasksCount/itemsPerPage 
                DataToReturn.numberOfPages=Math.ceil(pageNums);
            }
            if(tasksOnSelectedPage.length>0){
                DataToReturn.tasks=tasksOnSelectedPage
            }
            return DataToReturn;
            
        }catch(e){
            logger.error(e.message)
        }
    }
    static async addTask(taskData){
        try{
            var result = await  client.get().collection("Tasks").insertOne(taskData)
            return (result.insertedId.toString());
        }catch(e){
            logger.error(e.message);
        }
    }
    static async editTask(taskId,newValues){
        try{
            var res = await  client.get().collection("Tasks").updateOne(taskId,newValues)
            if(res.modifiedCount==1){
                return 'success'
            }
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
                    completed: result[i].completed,
                    color: result[i].color,
                    id: result[i]._id,
                    
                })
            }
            return (tasksArray);

        }catch(e){
            logger.error(e.message);
        }
    }
    static async deleteTask(data){
        try{
            var res = await  client.get().collection("Tasks").deleteOne(data)
            if(res.deletedCount==1){
                return 'task deleted'
            }
        }catch(e){
            logger.error(e.message);
        }
    }
}
module.exports = TaskModel;