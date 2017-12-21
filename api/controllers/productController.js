'use strict';

const allModels = require('../models/productModels'),
    productModel = allModels.productModel,
    brandModel = allModels.brandModel,
    occasionModel = allModels.occasionModel;
require('mongoose-pagination');

module.exports = {
    getAll: function (req, res, next) {
        var page = 1, limit = 10;
        if (req.query.page) {page = Number(req.query.page);}
        if (req.query.limit) {limit = Number(req.query.limit);}
        productModel.find({status: 1}).paginate(page, limit, function (err, result, total) {
            console.log(page + " , " + limit);
           if (err) {
               console.log(err);
               res.status(500);
               res.send({
                   'status': '500',
                   'error': 'Server error, please contact us'
               });
               return;
           }
           res.send({
               'totalPage': Math.ceil(total/limit),
               'items': result
           });
        });
    },
    getById: function (req, res, next) {
      productModel.find({_id: req.params.id}, function (err, result) {
         if (err) {
             console.log(err);
             res.status(500);
             res.send({
                 status: '500',
                 error: 'Server error, please contact us'
             });
             return;
         }
         else if (result.length === 0) {
             res.status = 404;
             res.send({
                 status: '404',
                 error: 'Not found'
             });
             return;
         }
         res.send(result[0]);
      });
    },
    getByBrandId: function (req, res, next) {
      productModel.find({brandId: req.query.brandId}, function (err, result) {
         if (err) {
             console.log(err);
             res.status(500);
             res.send({
                 'status': '500',
                 'error': 'Server error, please contact us'
             });
             return;
         }
         else if (result.length === 0) {
             res.status = 404;
             res.send({
                 status: '404',
                 error: 'Not found'
             });
             return;
         }
          res.send(result);
      });
    },
    getByOccasionId: function (req, res, next) {
        productModel.find({occasionId: req.query.occasionId}, function (err, result) {
            if (err) {
                console.log(err);
                res.status(500);
                res.send({
                    status: '500',
                    error: 'Server error, please contact us'
                });
                return;
            }
            else if (result.length === 0) {
                res.status = 404;
                res.send({
                    status: '404',
                    error: 'Not found'
                });
                return;
            }
            res.send(result);
        });
    },
    getByBrandNOccasion: function (req, res, next) {
        productModel.find({occasionId: req.query.occasionId, brandId: req.query.brandId}, function (err, result) {
            if (err) {
                console.log(err);
                res.status(500);
                res.send({
                    status: '500',
                    error: 'Server error, please contact us'
                });
                return;
            }
            else if (result.length === 0) {
                res.status = 404;
                res.send({
                    status: '404',
                    error: 'Not found'
                });
                return;
            }
            res.send(result);
        });
    },
    // Post controller
    postAProduct: function (req, res, next) {
        var newProduct = new productModel(req.body);
        newProduct.save(function (err, result) {
            if (err) {
                console.log(err);
                res.status(500);
                res.send({
                    status: '500',
                    error: 'Server error, please contact us'
                });
                return;
            }
            res.send(result);
        });
    }
};