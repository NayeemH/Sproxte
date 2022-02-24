const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Actual project schema
const iepTemplateSchema = Schema({
    userID: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    productTypeId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    description: {
        type: String,
    },
    images: {
        type: Array,
    },
    status: {
        type: String,
        default: 'pending'
    }
}, {timestamps: true});


// Creating the project model
const IEPTemplate = mongoose.model('IEPTemplate', iepTemplateSchema);


module.exports = IEPTemplate;