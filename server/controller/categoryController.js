var CategoryService = require('./../services/CategoryService.js'); 
class CategoryController {
    static async newCategory(req, res, next) {
        var category = req.body;

        var response = await CategoryService.decodeToken(category); 

        res.send(response);
    };
    static async getCategories(req, res, next){
        var auth=req.headers.authorization;
        var response = await CategoryService.getCreatedby(auth);
        res.send(response);
    }
}
module.exports = CategoryController;