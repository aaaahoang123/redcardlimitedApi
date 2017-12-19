'use strict';

const express = require('express'),
    router = express.Router(),
   controllers = require('../controllers/brandsController');

router.get('/', controllers.getAllBrand)
    .post('/', controllers.checkToken, controllers.postABrand)
    .get('/:id', controllers.getABrand);
module.exports = router;