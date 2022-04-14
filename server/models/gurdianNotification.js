const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const gurdianNotificationSchema = Schema({
    message: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    projectId: {
        type: Schema.Types.ObjectId,
    },
    productId: {
        type: Schema.Types.ObjectId
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    }
}, {timestamps: true});



const Notification = mongoose.model('gurdianNotification', gurdianNotificationSchema);


module.exports = Notification;