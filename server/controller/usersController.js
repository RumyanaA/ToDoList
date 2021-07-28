var UserService=require('../services/UserService.js');
const newUser = (req, res, next) => {
    var userData=req.body;
    
    var token= UserService.generateToken(userData);
    
    res.send(token);
};

module.exports = {newUser};