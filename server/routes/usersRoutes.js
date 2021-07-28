const express = require('express');
const router  = express.Router();
const userController = require('../controllers/usersController');
router.post('/userInfo', userController.newUser);
module.exports = router;