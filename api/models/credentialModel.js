'use strict';

var mongoose = require('mongoose');

var credentialSchema = new mongoose.Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_accounts'
    },
    token: {
        type: String,
        required: 'Must have token to insert here'
    },
    type: {
      type: Number,
      required: 'Must has type of user',
      enum: [0,1],
      default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiredAt: {
        type: Date,
        default: +new Date() + 7*24*60*60*1000
    },
    refreshToken: String,
    status: {
        type: Number,
        enum: [1,-1],
        default: 1
    }
});

module.exports = mongoose.model('credentials', credentialSchema);