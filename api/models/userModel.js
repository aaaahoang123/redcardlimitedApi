'use strict';

var mongoose = require('mongoose');

var userAccSchema = mongoose.Schema({
    type: {
      type: Number,
      enum: [0, 1],
      default: 1
    },
    username: {
        type: String,
        unique: true
    },
    password: String,
    customerId: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Number,
        enum: [1, -1],
        default: 1
    }
});

var cusInfoSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    birthDay: String,
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        enum: [-1,0,1],
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Number,
        enum: [1, -1],
        default: 1
    }
});
module.exports = {
  userAcc: mongoose.model('user_accounts', userAccSchema),
  cusInfo: mongoose.model('customer_infos', cusInfoSchema)
};