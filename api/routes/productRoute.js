const express= require('express'),
    router = express.Router(),
    brandController = require('../controllers/brandsController'),
    controllers = require('../controllers/productController');

router.get('/', function (req, res, next) {
    if (req.query.brandId && req.query.occasionId) {
        controllers.getByBrandNOccasion(req, res, next);
    }
    else if (req.query.occasionId) {
        controllers.getByOccasionId(req, res, next);
    }
    else if (req.query.brandId) {
        controllers.getByBrandId(req, res, next);
    }
    else {
        controllers.getAll(req, res, next);
    }
})
    .get('/:id', controllers.getById)
    .post('/', brandController.checkToken, controllers.postAProduct);

module.exports = router;