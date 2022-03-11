const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Actual project schema
const orderSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    deleveryStatus: {
        type: String,   // pending, accepted, shipping, delevered
        default: 'pending'
    },
    paymentStatus: {
        type: String,   // due paid
        default: 'due'
    },
    price: {
        type: Number,
        default: 0
    },
    orders: {
        type: Array
    },
}, {timestamps: true});


// Creating the project model
const Order = mongoose.model('order', orderSchema);


module.exports = Order;