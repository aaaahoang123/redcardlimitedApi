'use strict';

const brandModel = require('../models/productModels').brandModel,
    credentialModel = require('../models/credentialModel');

module.exports = {
    checkToken: function (req, res, next) {
        credentialModel.find({token: req.headers.token}, function (err, result) {
            if (err) {
                console.log(err);
                res.status(500);
                res.send({
                    status: '500',
                    error: 'Server error'
                });
                return;
            }
            if (result.type !== 0) {
                res.status(550);
                res.send({
                    status: '550',
                    error: 'Permission Denied'
                });
                return;
            }
            next();
        })

    },
    postABrand: function (req, res, next) {
        var newBrand = new brandModel(req.body);
        newBrand.save(function (err, result) {
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
    getAllBrand: function (req, res) {
        brandModel.find({}, function (err, result) {
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
    getABrand: function (req, res) {
        brandModel.find({_id: req.params.id}, function (err, result) {
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