'use strict';

const orderModel = require('../models/orderModels');
require('mongoose-pagination');
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
        if (req.adminPermission) {
            var page = 1;
            var limit = 10;
            var status = {};
            if (req.query.page) page = Number(req.query.page);
            if (req.query.limit) limit = Number(req.query.limit);
            if (req.query.status) status = {status: req.query.status};
            orderModel.find(status).paginate(page, limit, function (err, result, total) {
                if (err) {
                    console.log(err);
                    res.status(500);
                    res.send({
                        status: '500',
                        error: 'Server error'
                    });
                    return;
                }
                res.send({
                    totalPage: Math.ceil(total/limit),
                    items: result
                })
            });
            // orderModel.find({}, function(err, result) {

            //     res.send(result);
            // })
        }
        else if (req.accountId) {
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
    }
};