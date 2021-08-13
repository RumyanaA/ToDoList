var UserService = require('./../services/UserService.js');
class usersController {
    static async newUser(req, res, next) {
        var userData = req.body;

        var response = await UserService.Register(userData);

        res.send(response);
    };
    static async loginUser(req, res, next) {
        var userData = req.body;
        var token = await UserService.tokenOnLogin(userData);
        res.send(token);
    }
    static async generatePassword(req, res, next) {
        var userData = req.body;
        var response = await UserService.passwordReset(userData);
        res.send(response);
    }
    static async activate(req, res, next) {
        var str = req.params.confirmationCode;
        var response = await UserService.activate(str);
        res.send(response);
    }
}
module.exports = usersController;