var express = require('express');
var bodyParser = require('body-parser');
var app=express();


app.post('/userInfo', async function (req, res) {
    var userData=req.body;
    
    var userId= await UserService.generateToken(userData);
    
    res.send(token);
 })