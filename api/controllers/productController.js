'use strict';

const allModels = require('../models/productModels'),
    productModel = allModels.productModel,
    brandModel = allModels.brandModel;
require('mongoose-pagination');

module.exports = {
    getAll: function (req, res, next) {
        var page = 1, limit = 12;
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
           var arrayitems = [];
           for (var i=result.length-1; i>=0; i--) {
               arrayitems.push(result[i]);
           }
           res.send({
               'totalPage': Math.ceil(total/limit),
               'items': arrayitems
           });
        });
    },
    getByMultiId: function(req, res, next) {
        var page = 1, limit = 10;
        if (req.query.page) {page = Number(req.query.page);}
        if (req.query.limit) {limit = Number(req.query.limit);}
        productModel.find({_id: {$in: JSON.parse(req.query.itemIds)}}).paginate(page, limit, function (err, result, total) {
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
         req.getIdResult = result[0];
         next();
      });
    },
    getBrandNameAndRes: function (req, res, next) {
        brandModel.find({_id: req.getIdResult.brandId}, function (err, result) {
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
            res.send({
                brandName: result[0].name,
                item: req.getIdResult
            });
        });

    },
    getByBrandId: function (req, res, next) {
        var page = 1, limit = 10;
        if (req.query.page) {page = Number(req.query.page);}
        if (req.query.limit) {limit = Number(req.query.limit);}
        productModel.find({status: 1, brandId: req.query.brandId}).paginate(page, limit, function (err, result, total) {
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
            var items = [];
            for (var i=result.length-1; i>=0; i--) {
                items.push(result[i]);
            }
            res.send({
                'totalPage': Math.ceil(total/limit),
                'items': items
            });
        });
    },
    getByCategoryId: function (req, res, next) {
        var page = 1, limit = 10;
        if (req.query.page) {page = Number(req.query.page);}
        if (req.query.limit) {limit = Number(req.query.limit);}
        productModel.find({status: 1, categoryId: req.query.categoryId}).paginate(page, limit, function (err, result, total) {
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
            var items = [];
            for (var i=result.length-1; i>=0; i--) {
                items.push(result[i]);
            }
            res.send({
                'totalPage': Math.ceil(total/limit),
                'items': items
            });
        });
    },
    getByBrandNCategory: function (req, res, next) {
        var page = 1, limit = 10;
        if (req.query.page) {page = Number(req.query.page);}
        if (req.query.limit) {limit = Number(req.query.limit);}
        productModel.find({status: 1, categoryId: req.query.categoryId, brandId: req.query.brandId}).paginate(page, limit, function (err, result, total) {
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
            var items = [];
            for (var i=result.length-1; i>=0; i--) {
                items.push(result[i]);
            }
            res.send({
                'totalPage': Math.ceil(total/limit),
                'items': items
            });
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
    },
    updateAProduct: function (req, res, next) {
        productModel.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true}, function (err, result) {
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