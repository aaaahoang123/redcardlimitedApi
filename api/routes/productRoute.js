const express= require('express'),
    router = express.Router(),
    authenticationController = require('../controllers/authenticationController'),
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
    .post('/', authenticationController.checkAdminToken, controllers.postAProduct)
    .put('/:id', authenticationController.checkAdminToken, controllers.updateAProduct);

module.exports = router;