var jwt = require('jsonwebtoken');
var config=require('./../config/config.js');
var UsersModel=require('./../database/UsersModel.js');
module.exports= class UserService{
    static async tokenOnRegister(userData){
        var userId= await UsersModel.addUser(userData);
        if(userId=='e.email'){
            return 'e.email';
        }
        if(userId=='e.username'){
            return "e.username";
        }
        var token=jwt.sign({ id: userId }, config.JWT_SECRET, {
            expiresIn: config.JWT_EXPIRES_IN,
          });
          return token;
        

    }
    static async tokenOnLogin(userData){
        var verifiedUserId=await UsersModel.verifyUser(userData);
        if(verifiedUserId=='-1'){
            return '-1';
        }
        var token=jwt.sign({ id: verifiedUserId }, config.JWT_SECRET, {
            expiresIn: config.JWT_EXPIRES_IN,
          });
          return token;
        
    }
    static async passwordReset(userData){
        var result = await UsersModel.verifyUserEmail(userData);
        return result;
    }
}
