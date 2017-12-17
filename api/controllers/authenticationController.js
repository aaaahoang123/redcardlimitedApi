'use strict';

var jwt = require('jwt-simple'),
    userModel = require('../models/userModel'),
    userAcc = userModel.userAcc;

module.exports = {
  checkUsername: function (req, res, next) {
    userAcc.find({username: req.body.username}, function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
            return;
        }
        next();
    })
  },
  checkPassword: function (req, res, next) {
      userAcc.find(req.body, function (err, result) {
          if (err) {
              console.log(err);
              res.send(err);
              return;
          }
          req.cpResult = result;
          next();
      })
  },
  login: function (req, res, next) {
      var token = jwt.encode(req.cpResult[0], 'anhHoangDepTrai');
      res.send({
          'username': req.cpResult[0].username,
          'token': token
      });
  }
};