const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Actual project schema
const templateOrderSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    templateId: {
        type: Schema.Types.ObjectId,
        required: true,
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
const TemplateOrder = mongoose.model('templateOrder', templateOrderSchema);


module.exports = TemplateOrder;