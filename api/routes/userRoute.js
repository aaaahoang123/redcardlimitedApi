const express = require('express'),
    router = express.Router();

var userControllers = require('../controllers/userController'),
    authenticationControllers = require('../controllers/authenticationController');

// Register a new account
router.post('/', userControllers.checkNull, userControllers.validateNamePass, userControllers.checkExistUserName, userControllers.addNewAccount)
    .get('/', authenticationControllers.checkAdminToken, userControllers.getAllAccountNCusinfo);


module.exports = router;