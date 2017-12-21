'use strict';

const express = require('express'),
    router = express.Router(),
    controllers = require('../controllers/categoriesController');

router.get('/', controllers.getAllCategories)
    .post('/', controllers.checkToken, controllers.postACategory)
    .get('/:id', controllers.getACategory);

module.exports = router;