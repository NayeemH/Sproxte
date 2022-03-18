const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Actual project schema
const orderSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    projectId: {
        type: Schema.Types.ObjectId
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
        type: String,   // pending, accepted, shipping, delivered
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



const Order = mongoose.model('order', orderSchema);


module.exports = Order;