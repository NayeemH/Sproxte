const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const layoutSchema = Schema({
    image: {
        type: String,
        required: true
    }
});


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
        type: String
    },
    sizes: {
        type: Array,
        required: true,
    },
    price: {
        type: Number,
        required: true,
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
    layouts: {
        type: [layoutSchema]
    },
    colors: {
        type: Array
    },
    productType: {
        type:  Schema.Types.ObjectId
    },
    sellCount: {
        type: Number,
        default: 0
    }
}, {timestamps: true});


// Creating the project model
const Template = mongoose.model('template', templateSchema);


module.exports = Template;