const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Actual project schema
const playerAddPriceSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    projectId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    teamName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    count: {
        type: Number,
        default: 0
    }
}, {timestamps: true});


const PlayerAddPrice = mongoose.model('playerAddPrice', playerAddPriceSchema);


module.exports = PlayerAddPrice;