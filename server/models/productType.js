const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        type: String,
        required: true,
    },
    categoryType: {
        type: Schema.Types.ObjectId,
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