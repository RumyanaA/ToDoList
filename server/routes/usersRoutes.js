const express = require('express');
const router = express.Router();
const userController = require('./../controller/usersController.js');
router.post('/userInfo', userController.newUser);
module.exports = router;