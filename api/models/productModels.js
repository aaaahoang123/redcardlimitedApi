'use strict';

const mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: {
        type: String,
        required: 'Product name can\'t be null'
    },
    productCode: {
        type: String,
        required: 'Product code can\'t be null'
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product_brands'
    },
    occasionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product_occasions'
    },
    description: {
        type: String,
        required: 'Description can\'t be null'
    },
    images: {
        bigImgs: [String],
        smallImgs: [String]
    },
    price: {
        type: String,
        require: 'Price is the most important'
    },
    status: {
        type: Number,
        enum: [-1,0,1], // -1: Đã ngừng bán, 0: tạm hết, 1: còn hàng,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

var brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Brand name can not be null'
    },
    description: {
        type: String
    },
    address: String,
    status: {
        type: Number,
        enum: [-1, 1],
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

var occasionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Occasion name can not be null'
    },
    description: String,
    status: {
        type: Number,
        enum: [-1, 1],
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = {
    productModel: mongoose.model('products', productSchema),
    brandModel: mongoose.model('brands', brandSchema),
    occasionModel: mongoose.model('occasions', occasionSchema)
};