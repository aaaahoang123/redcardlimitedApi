const express= require('express'),
    router = express.Router(),
    brandController = require('../controllers/brandsController'),
    controllers = require('../controllers/productController');

router.get('/', function (req, res, next) {
    if (req.query.itemIds) {
        controllers.getByMultiId(req, res, next);
    }
    else if (req.query.brandId && req.query.categoryId) {
        controllers.getByBrandNCategory(req, res, next);
    }
    else if (req.query.categoryId) {
        controllers.getByCategoryId(req, res, next);
    }
    else if (req.query.brandId) {
        controllers.getByBrandId(req, res, next);
    }
    else {
        controllers.getAll(req, res, next);
    }
})
    .get('/:id', controllers.getById, controllers.getBrandNameAndRes)
    .post('/', brandController.checkToken, controllers.postAProduct);

module.exports = router;