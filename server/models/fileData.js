const {Schema, model} = require('mongoose');


const fildDataSchema = Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    files: {
        type: [String],
        required: true
    }
}, {timestamps: true});

const fileData = model('fileData', fildDataSchema);

module.exports = fileData;