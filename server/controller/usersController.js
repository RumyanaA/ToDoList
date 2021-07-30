var UserService=require('./../services/UserService.js');

const newUser = async (req, res, next) => {
    var userData=req.body;
    
    var token= await UserService.generateToken(userData);
    
    res.send(token);
};

module.exports = {newUser};