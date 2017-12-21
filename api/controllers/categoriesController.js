'use strict';

const categoryModel = require('../models/productModels').categoryModel,
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
            if (result[0].type !== 0) {
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
    postACategory: function (req, res, next) {
        var newCategory = new categoryModel(req.body);
        newCategory.save(function (err, result) {
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
    getAllCategories: function (req, res) {
        categoryModel.find({}, function (err, result) {
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
    getACategory: function (req, res) {
        categoryModel.find({_id: req.params.id}, function (err, result) {
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