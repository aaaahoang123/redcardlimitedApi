'use strict';

const occasionModel = require('../models/productModels').occasionModel,
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
    postAnOccasion: function (req, res, next) {
        var newOccasion = new occasionModel(req.body);
        newOccasion.save(function (err, result) {
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
    getAllOccasion: function (req, res) {
        occasionModel.find({}, function (err, result) {
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
    getAnOccasion: function (req, res) {
        occasionModel.find({_id: req.params.id}, function (err, result) {
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