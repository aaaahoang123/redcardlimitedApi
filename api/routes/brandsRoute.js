'use strict';

const express = require('express'),
    router = express.Router(),
    authenticationController = require('../controllers/authenticationController'),
   controllers = require('../controllers/brandsController');

router.get('/', controllers.getAllBrand)
    .post('/', authenticationController.checkAdminToken, controllers.postABrand)
    .get('/:id', controllers.getABrand);
module.exports = router;