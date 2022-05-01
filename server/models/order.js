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
    type: {
        type: String,
        default: 'normal'
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    // For team info
    logo: {
        type: String
    },
    teamName: {
        type: String
    },
    location: {
        type: String
    },
    color: {
        type: String
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
    playerAddPrice: {
        type: Array,
        default: null
    },
    orders: {
        type: Array
    },
}, {timestamps: true});



const Order = mongoose.model('order', orderSchema);


module.exports = Order;