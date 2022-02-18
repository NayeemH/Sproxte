const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tokenSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 360000
    }
}, {timestamps: true});



const Token = mongoose.model('token', tokenSchema);

module.exports = Token;