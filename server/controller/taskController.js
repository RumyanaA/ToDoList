var TaskService = require('./../services/TaskService.js')
class taskController{
    static async recieveToken(req, res, next){
        var auth = req.headers.authorization;
        var skipNum=req.query.skipItemsnum
        var response = await TaskService.decodeToken(auth,skipNum);
        res.send(response);
    }
    static async newTask(req, res, next) {
        var taskData = req.body;

        var response = await TaskService.getUserId(taskData);

        res.send(response);
    };
    static async getTasks(req, res, next){
        var auth=req.headers.authorization;
        var response = await TaskService.getCreatedby(auth);
        res.send(response);
    }
    static async editTask(req,res, next){
        var taskNewData=req.body
        var response = await TaskService.updateTask(taskNewData);
        res.send(response)
    }
    static async deleteTask(req, res, next){
        var taskId =req.query.id
        var response = await TaskService.removeTask(taskId);
        res.send(response)
    }
}
module.exports = taskController;