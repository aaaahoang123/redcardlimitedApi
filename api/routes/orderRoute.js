'use strict';

const express = require('express'),
    router = express.Router(),
    authenticationController = require('../controllers/authenticationController'),
    controllers = require('../controllers/orderController');

router.post('/', authenticationController.checkToken, controllers.addAnOrder)
    .get('/', function (req, res, next) {
        if (req.query.permission === 'admin') {
            authenticationController.checkAdminToken(req, res, next);
        }
        else {
            authenticationController.checkToken(req, res, next)
        }
    }, controllers.getAllOrders);

router.get('/:id', authenticationController.checkToken, controllers.getAnOrder);

module.exports = router;