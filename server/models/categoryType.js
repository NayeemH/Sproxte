const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Actual project schema
const categoryTypeSchema = Schema({
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
    }
}, {timestamps: true});


// Creating the project model
const Category = mongoose.model('category', categoryTypeSchema);


module.exports = Category;