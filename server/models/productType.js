const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const layoutSchema = Schema({
    image: {
        type: String,
        required: true
    }
});

// Actual project schema
const productTypeSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    pngImageFront: {
        type: String,
        required: true,
    },
    pngImageBack: {
        type: String
    },
    categoryType: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    layouts: {
        type: [layoutSchema]
    },
    imageData: {
        type: Array
    },
    sizes: {
        type: Array,
        required: true,
    },
    price: {
        type: Number,
        default: 0
    },
    priceArray: {
        type: Object
    },
    discount: {
        type: Object
    },
    weight: {
        type: Number,
        required: true
    },
    playerAddPrice: {
        type: Number,
        default: 0
    },
    sellCount: {
        type: Number,
        default: 0
    }
}, {timestamps: true});


// Creating the project model
const ProductType = mongoose.model('productType', productTypeSchema);


module.exports = ProductType;