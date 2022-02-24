const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Actual project schema
const productTypeOrderSchema = Schema({
    userID: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    productTypeId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    IEPTemplateId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    deleveryStatus: {
        type: String,   // pending, accepted, shipping, delevered
        default: 'pending'
    },
    paymentToken: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
}, {timestamps: true});


// Creating the project model
const ProductTypeOrder = mongoose.model('productTypeOrder', productTypeOrderSchema);


module.exports = ProductTypeOrder;