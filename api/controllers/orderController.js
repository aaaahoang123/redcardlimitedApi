'use strict';

const orderModel = require('../models/orderModels');

module.exports = {
    addAnOrder: function(req, res, next) {
        var newOrder = new orderModel({
            accountId: req.accountId,
            customerName: req.body.customerName,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            products: req.body.products,
            totalPrice: req.body.totalPrice
        });
        newOrder.save(function(err, result) {
            if (err) {
                console.log(err);
                res.status(500);
                res.send({
                    status: '500',
                    error: 'Server error'
                });
                return;
            }
            res.send(result);
        })
    },
    getAnOrder: function(req, res, next) {
        orderModel.find({_id: req.params.id, accountId: req.accountId}, function(err, result) {
            if (err) {
                console.log(err);
                res.status(500);
                res.send({
                    status: '500',
                    error: 'Server error'
                });
                return;
            }
            res.send(result);
        })
    },
    getAllOrders: function(req, res, next) {
        orderModel.find({accountId: req.accountId}, function(err, result) {
            if (err) {
                console.log(err);
                res.status(500);
                res.send({
                    status: '500',
                    error: 'Server error'
                });
                return;
            }
            res.send(result);
        })
    }
};