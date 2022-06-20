const Notification = require('../models/notification');
const User = require('../models/user');
const sendMail = require('./sendMail');
const {CLIENT_URL} = process.env;

const hexToBase64 = (hexString) => {
    return Buffer.from(hexString.slice(0, 8), 'hex').toString('base64').slice(0, 6);
}


const sendNotification = async (message, users, orderId, projectId, productId, type = 'success') => {
    try {
        await new Notification({
            type,
            message,
            projectId,
            productId,
            users,
            user: users[users.length - 1]
        }).save();

        const usersData = await User.find({_id: {$in: users}}, {name: 1, email: 1});
        

        // Verify Email
        await Promise.all(usersData.map(user => {
            return sendMail({
                to: user.email,
                subject: 'Notification Mail',
                text: `This is a notification mail`,
                template: 'notification',
                context: {
                    username: user.name,
                    message: `${message}. The order id is ${hexToBase64(orderId)}`,
                    link: `${CLIENT_URL}/dashboard`
                }
            });
        }));
      
    }
    catch(error) {
        console.log(error.message);
    }
}


module.exports = sendNotification;