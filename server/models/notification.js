const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const notificationSchema = Schema({
    type: {
        type: String,
        default: 'success'
    },
    message: {
        type: String,
        required: true
    },
    projectId: {
        type: Schema.Types.ObjectId,
    },
    productId: {
        type: Schema.Types.ObjectId
    },
    users: {
        type: [Schema.Types.ObjectId],
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
}, {timestamps: true});



const Notification = mongoose.model('notification', notificationSchema);


module.exports = Notification;