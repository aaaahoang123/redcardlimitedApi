'use strict';

const express = require('express'),
    router = express.Router(),
    authenticationController  = require('../controllers/authenticationController'),
    controllers = require('../controllers/categoriesController');

router.get('/', controllers.getAllCategories)
    .post('/', authenticationController.checkAdminToken, controllers.postACategory)
    .get('/:id', controllers.getACategory);

module.exports = router;