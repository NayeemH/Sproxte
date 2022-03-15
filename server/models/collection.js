const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    message: {
        type: String,
        required: true
    },
    points: {
        type: Array,
        required: true
    }
}, {timestamps: true});


const collectionSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    feedbacks: {
        type: [feedbackSchema],
    }
}, {timestamps: true});



const Collection = mongoose.model('collection', collectionSchema);


module.exports = Collection;