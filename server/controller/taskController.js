var TaskService = require('./../services/TaskService.js')
class taskController{
    static async newTask(req, res, next) {
        var taskData = req.body;

        var response = await TaskService.getUserId(taskData);

        res.send(response);
    };
}
module.exports = taskController;