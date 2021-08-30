var TaskService = require('./../services/TaskService.js')
class taskController{
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
}
module.exports = taskController;