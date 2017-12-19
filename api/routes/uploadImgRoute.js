'use strict';

const express = require('express'),
    router = express.Router();
var controller = require('../controllers/uploadImgController');

router.post('/', controller.firstImg, controller.secondImg, controller.thirdImg, controller.finalImg);

module.exports = router;