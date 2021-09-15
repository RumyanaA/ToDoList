const express = require('express');
const router = express.Router();
const userController = require('./../controller/usersController.js');
const CategoryController = require('./../controller/categoryController.js');
const taskController = require('./../controller/taskController.js');
router.post('/Register', userController.newUser);
router.post('/Login', userController.loginUser);
router.post('/ResetPassword', userController.generatePassword);
router.get('/activate/:confirmationCode',userController.activate);
router.get('/getPaginationData', taskController.recieveToken);
router.post('/addCategory', CategoryController.newCategory);
router.get('/getCatName',CategoryController.getCategories);
router.post('/SaveNewTask', taskController.newTask);
router.get('/getAllTasks', taskController.getTasks);
router.put('/editTask', taskController.editTask);
router.delete('/deleteTask', taskController.deleteTask)
module.exports = router;