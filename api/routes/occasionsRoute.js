'use strict';

const express = require('express'),
    router = express.Router(),
    controllers = require('../controllers/occasionsController');

router.get('/', controllers.getAllOccasion)
    .post('/', controllers.checkToken, controllers.postAnOccasion)
    .get('/:id', controllers.getAnOccasion);

module.exports = router;