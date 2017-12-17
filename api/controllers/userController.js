'use strict';

var userModel = require('../models/userModel'),
    userAccModel = userModel.userAcc,
    cusInfoModel = userModel.cusInfo;

module.exports = {
    // check null của request
    checkNull: function (req,res,next) {
        var data = req.body;
        console.log(data);
        if (!data.username || !data.password || !data.fullName || !data.email || !data.phone) {
            res.send({
                'status': '403',
                'message': 'Username, password, full name, email, phone can\'t be null or undefined'
            });
            return;
        }
        next();
    },
    // username and password phải có ít nhất 8 ký tự
    validateNamePass: function (req, res, next) {
        var data = req.body;
        if (data.username.length < 8 || data.password.length < 8) {
            res.send({
                'status': '403',
                'message': 'Username and password must has 8 characters or longer'
            });
            return;
        }
        next();
    },
    // kiểm tra username đã tồn tại chưa
    checkExistUserName: function (req, res, next) {
        var data = req.body;
        userAccModel.find({username: data.username}, function (err, result) {
            if (err) {
                console.log(err);
                res.send(err);
                return;
            }
            else if (result.length !== 0) {
                res.send({
                    "status": "400",
                    "error": "This username has already existed"
                });
                return;
            }
            next();
        })
    },
    // thêm tài khoản mới
    addNewAccount: function (req, res) {
        var data = req.body;
        // save customer info after validate
        var cusInfo = new cusInfoModel({
            "fullName": data.fullName,
            "birthDay": data.birthDay,
            "email": data.email,
            "phone": data.phone,
            "gender": Number(data.gender)
        });
        // save the customer's information
        cusInfo.save(function (err, result) {
            if (err) {
                console.log(err);
                res.send(err);
                return;
            }
        }).then(function () {
            // create user Account for customer
            var userAcc = new userAccModel({
                username: data.username,
                password: data.password,
                customerId: cusInfo._id
            });
            userAcc.save(function (err, result) {
                if (err) {
                    console.log(err);
                    res.send(err);
                    return;
                }
                res.send({
                    'status': '200',
                    'customerInfo': cusInfo,
                    'userAccount': result
                });
            });
        });
    }
};