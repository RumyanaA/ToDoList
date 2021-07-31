var UserService=require('./../services/UserService.js');
class usersController{
static async newUser(req, res, next){
    var userData=req.body;
    
    var token= await UserService.tokenOnRegister(userData);
    
    res.send(token);
};
static async loginUser(req, res, next){
    var userData=req.body;
    var token = await UserService.tokenOnLogin(userData);
    res.send(token);
}
}
module.exports = usersController;