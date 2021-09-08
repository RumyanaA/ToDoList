var jwt = require('jsonwebtoken');
var config = require('./../config/config.js');
var logger = require('./LoggingService.js');
var ObjectId = require('mongodb').ObjectId;
var TaskModel = require('./../database/TaskModel.js')
class TaskService{
    static async getUserId(taskData) {
        var token=taskData.createdby;
        try{
        var userid= jwt.verify(token, config.JWT_SECRET)
        taskData.createdby=userid.id;

        var result = await TaskModel.addTask(taskData);
        return result;
        }catch(e){
            logger.error(e.message);
        }
       

    }
    static async getCreatedby(auth){
        
        try{
            // var token=auth.slice(7);
            var payload = jwt.verify(auth.slice(7), config.JWT_SECRET);
            
            var result = await TaskModel.getTasks(payload.id);
            return result;

        }catch(e){
            logger.error(e.message);
        }
    }
    static async updateTask(taskNewData){
        var newValues={$set:{
            'taskName': taskNewData.taskName,
            'taskDescr': taskNewData.taskDescr,
            'important': taskNewData.important,
            'completed': taskNewData.completed,
            'color': taskNewData.color,
            'dueDate': taskNewData.dueDate, 
            'category': taskNewData.category          
        }
        }
        
        var taskId={
            _id: ObjectId(taskNewData.id)
              }
        var result = await TaskModel.editTask(taskId,newValues)
        return result;
    }
}
module.exports = TaskService;