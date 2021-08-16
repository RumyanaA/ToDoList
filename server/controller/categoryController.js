var CategoryService = require('./../services/CategoryService.js'); // CategoryService
class CategoryController {
    static async newCategory(req, res, next) {
        var category = req.body;

        var response = await CategoryService.DecodeToken(category); //not register

        res.send(response);
    };
}
module.exports = CategoryController;