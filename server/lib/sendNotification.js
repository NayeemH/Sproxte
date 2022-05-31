const Notification = require('../models/notification');

const sendNotification = async (message, users, projectId, productId, type = 'success') => {
    try {
        await new Notification({
            type,
            message,
            projectId,
            productId,
            users,
            user: users[users.length - 1]
        }).save();
    }
    catch(error) {
        console.log(error.message);
    }
}

module.exports = sendNotification;