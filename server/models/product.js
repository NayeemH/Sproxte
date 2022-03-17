const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    projectId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    typeId: {
        type: Schema.Types.ObjectId
    },
    type: {
        type: String,   // custom readymade team
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: Object,
        required: true
    },
    colorImage: {
        type: String
    },
    size: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending' // working approved
    },
    price: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    count: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    layoutImage: {
        type: String,
    },
    primaryText: {
        type: String,
    },
    primaryColor: {
        type: String,
    },
    secondaryText: {
        type: String,
    },
    secondaryColor: {
        type: String,
    },
    frontImages: {
        type: Array,
    },
    backImages: {
        type: Array,
    }
}, {timestamps: true});



const Product = mongoose.model('product', productSchema);


module.exports = Product;