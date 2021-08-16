var jwt = require('jsonwebtoken');

var config = require('./../config/config.js');
var logger = require('./LoggingService.js');
var CategoryModel = require('./../database/CategoryModel.js');
module.exports = class CategoryService {
    static async DecodeToken(category) {
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
}