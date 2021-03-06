'use strict';

const brandModel = require('../models/productModels').brandModel;

module.exports = {
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