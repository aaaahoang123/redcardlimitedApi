const express = require('express'),
    router = express.Router();

var authController = require('../controllers/authenticationController');

router.post('/', authController.checkUsername, authController.checkPassword, authController.login)
    .delete('/', authController.logout);

module.exports = router;