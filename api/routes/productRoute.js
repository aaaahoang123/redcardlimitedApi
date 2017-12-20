const express= require('express'),
    router = express.Router(),
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
    .get('/:id', controllers.getById);

module.exports = router;