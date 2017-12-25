'use strict';

const express = require('express'),
    router = express.Router(),
    authenticationController = require('../controllers/authenticationController'),
    controllers = require('../controllers/orderController');

router.post('/', authenticationController.checkToken, controllers.addAnOrder)
    .get('/', authenticationController.checkToken, controllers.getAllOrders);

router.get('/:id', authenticationController.checkToken, controllers.getAnOrder);

module.exports = router;