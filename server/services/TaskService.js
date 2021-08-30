var jwt = require('jsonwebtoken');
var config = require('./../config/config.js');
var logger = require('./LoggingService.js');
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
}
module.exports = TaskService;