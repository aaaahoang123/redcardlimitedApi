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
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiredAt: {
        type: Date,
        default: +new Date() + 7*24*60*60*1000
    },
    refreshToken: String
});

module.exports = mongoose.model('credentials', credentialSchema);