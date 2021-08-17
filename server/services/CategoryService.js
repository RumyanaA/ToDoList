var jwt = require('jsonwebtoken');

var config = require('./../config/config.js');
var logger = require('./LoggingService.js');
var CategoryModel = require('./../database/CategoryModel.js');
module.exports = class CategoryService {
    static async decodeToken(category) {
        var token=category.createdby;
        try{
        var userid= jwt.verify(token, config.JWT_SECRET)
        category.createdby=userid.id;

        var result = await CategoryModel.addCategory(category);
        return result;
        }catch(e){
            logger.error(e.message);
        }
       

    }
    static async getCreatedby(auth){
        
        try{
            // var token=auth.slice(7);
            var payload = jwt.verify(auth.slice(7), config.JWT_SECRET);
            
            var result = await CategoryModel.getAllCat(payload.id);
            return result;

        }catch(e){
            logger.error(e.message);
        }
    }
}