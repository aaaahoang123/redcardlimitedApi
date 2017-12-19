'use strict';

var jwt = require('jwt-simple'),
    userModel = require('../models/userModel'),
    credentialModel = require('../models/credentialModel'),
    userAcc = userModel.userAcc;

function makeAToken(string) {
    var token = "", num;
    var code = 'Anh Hoang Dep Trai';
    for (var i=0; i<string.length; i++) {
        num = string[i].charCodeAt();
        token += num.toString(Math.floor((Math.random() * 10)+26));
    }
    token += '.';
    for (i=0; i<code.length; i++) {
        num = code[i].charCodeAt();
        token += num.toString(Math.floor((Math.random() * 10)+26));
    }
    return token;
}

module.exports = {
  checkUsername: function (req, res, next) {
    userAcc.find({username: req.body.username}, function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
            return;
        }
        else if (result.length === 0) {
            res.status(404);
            res.send({
                'status': '404',
                'error': 'Invalid username'
            });
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
          else if (result.length === 0) {
              res.status(404);
              res.send({
                  'status': '404',
                  'error': 'Invalid password'
              });
              return;
          }
          req.cpResult = result;
          next();
      })
  },
  login: function (req, res, next) {
      var token = makeAToken(req.body.username);
      var refresh = jwt.encode(req.cpResult[0]._id, 'refresh');
      var credential = new credentialModel({
          accountId: req.cpResult[0]._id,
          token: token,
          refreshToken: refresh
      });
      credential.save(function (err, result) {
          if (err) {
              console.log(err);
              res.send(err);
              return;
          }
          res.send(result);
      })
  }
};