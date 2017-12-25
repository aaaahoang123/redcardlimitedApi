'use strict';

const mongoose = require('mongoose');

var orderSchema = mongoose.Shema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_accounts'
    },
    customerName: {
        type: String,
        required: 'Customer name can not be null'
    },
    email: String,
    phone: String,
    address: {
        type: String,
        required: 'Address can not be null'
    },
    totalPrice: {
        type: 'String',
        required: 'Total Price can\'t be null'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    shippedAt: Date,
    status: {
        type: Number,
        enum: [0,1,2] // 0: order not confirm, 1: confirm order, 2: order complete shipping
    }
});


