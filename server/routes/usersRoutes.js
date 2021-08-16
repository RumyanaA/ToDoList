const express = require('express');
const router = express.Router();
const userController = require('./../controller/usersController.js');
const CategoryController = require('./../controller/categoryController.js');
router.post('/Register', userController.newUser);
router.post('/Login', userController.loginUser);
router.post('/ResetPassword', userController.generatePassword);
router.get('/activate/:confirmationCode',userController.activate);
router.post('/addCategory', CategoryController.newCategory);
module.exports = router;