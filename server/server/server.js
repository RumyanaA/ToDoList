var client = require('./../config/dbConnect.js');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app=express();
var routes = require('./../routes/usersRoutes.js'); // import the routes
app.use(cors());
app.use(express.json());

app.use('/', routes); //to use the routes
client.dbConnect(); 
 var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })
