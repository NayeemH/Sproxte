const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const OrderSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: "users"
    },
    type:{
        type: String,
        required: true,
    },
    paymentDone:{
        type: Boolean,
        default: false
    },
    date: {
        type: Date
    },
    delivered: {
        type: Boolean,
        default: false
    },

    products: {
        type: Array,
        default: []
    },
    price:{
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }
}, {timestamp:true});

const Oder = mongoose.model('order',OrderSchema);

module.exports = Oder;