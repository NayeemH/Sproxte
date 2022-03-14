const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const collectionSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    projectId: {
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
    }
}, {timestamps: true});



const Collection = mongoose.model('collection', collectionSchema);


module.exports = Collection;