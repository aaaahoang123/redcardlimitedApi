const express= require('express'),
    router = express.Router(),
    controllers = require('../controllers/productController');

router.get('/', controllers.getAll);

module.exports = router;