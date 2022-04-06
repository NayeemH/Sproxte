const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Actual project schema
const projectSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    orderId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    active: {
        type: Boolean,
        default: true
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'normal'
    },
    count: {
        type: Number,
        default: 0
    },
    status: {
        type: String,   // pending, accepted, shipping, delevered
        default: 'pending'
    },
    price: {
        type: Number,
        default: 0
    }
}, {timestamps: true});


// Creating the project model
const Project = mongoose.model('project', projectSchema);


module.exports = Project;