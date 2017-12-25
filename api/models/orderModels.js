'use strict';

const mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
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
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: {
            type: Number,
            required: 'Quantity can\'t be null'
        },
        unitPrice: {
            type: Number,
            required: 'Unit Price can\'t be null'
        }
    }],
    totalPrice: {
        type: Number,
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
        enum: [0,1,2], // 0: order not confirm, 1: confirm order and shipping, 2: order complete shipping
        default: 0
    }
});

module.exports = mongoose.model('orders', orderSchema);