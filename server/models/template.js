const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Actual project schema
const templateSchema = Schema({
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
    sizes: {
        type: Array,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false
    },
    sellCount: {
        type: Number,
        default: 0
    }
}, {timestamps: true});


// Creating the project model
const Template = mongoose.model('template', templateSchema);


module.exports = Template;