const express = require('express'),
    router = express.Router();

var userControllers = require('../controllers/userController');

// Register a new account
router.post('/', userControllers.checkNull, userControllers.validateNamePass, userControllers.checkExistUserName, userControllers.addNewAccount);


module.exports = router;