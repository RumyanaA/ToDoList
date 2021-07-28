var MongoClient = require('mongodb').MongoClient;
var logger = require('./../services/LoggingService.js');

var dbConnect = async function () {
    try{
        var url= "mongodb://localhost:27017/ToDoList";
    return await MongoClient.connect(url);
    }
    catch(e){
        logger.error(e.message);
        //txt.
    }
  }

  module.exports=dbConnect;
  