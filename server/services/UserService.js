var jwt = require('jsonwebtoken');
var config = require('./../config/config.js');
var UsersModel = require('./../database/UsersModel.js');
module.exports = class UserService {
    static async Register(userData) {
        var result = await UsersModel.addUser(userData);
        if (result == 'e.email') {
            return 'e.email';
        }
        else if (result == 'e.username') {
            return "e.username";
        } else {
            return 'confimation email sent';
        }

    }
    static async tokenOnLogin(userData) {
        var verifiedUserId = await UsersModel.verifyUser(userData);
        if (verifiedUserId == '-1') {
            return '-1';
        }
        var token = jwt.sign({ "id": verifiedUserId }, config.JWT_SECRET/*, {
            expiresIn: config.JWT_EXPIRES_IN,
        }*/);
        return token;

    }
    static async passwordReset(userData) {
        var result = await UsersModel.verifyUserEmail(userData);
        return result;
    }
    static async activate(str) {
        var result = await UsersModel.activate(str);
        return result;
    }
}
