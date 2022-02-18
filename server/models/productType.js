const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Actual project schema
const productTypeSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    pngImage: {
        type: String,
        required: true,
    },
    svgImage: {
        type: String,
        required: true,
    },
    sizes: {
        type: Array,
        required: true,
    }
}, {timestamps: true});


// Creating the project model
const ProductType = mongoose.model('productType', productTypeSchema);


module.exports = ProductType;