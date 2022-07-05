const router = require('express').Router();
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const Order = require('../../models/order');
const User = require('../../models/user');
// const Project = require('../../models/project');
const sendMail = require('../../lib/sendMail');
const {CLIENT_URL} = process.env;
// const {paymentHandle} = require('../../lib/paymentHandle');


router.post('/:orderId', async (req, res, next) => {
    try {
        const { orderId } = req.params;

        // await paymentHandle({
        //     metadata: { userId, orderId }
        // });
        
        const order = await Order.findOneAndUpdate({_id: orderId}, {$set: { paymentStatus: 'due'}});
        // await Project.findOneAndUpdate({_id: order.projectId}, {$set: {isAdmin: true}});
        

        // Find the email 
        let user = await User.findOne({email: order.email});
        let password;
        // Throw error if email already registers
        if(!user) {
            password = crypto.randomBytes(4).toString('hex');

            // Creating user
            const newUser = new User({
                name: order.firstName,
                email: order.email,
                password: await bcrypt.hash(password, 12),
                userType: 'client',
            });

            // Save User data to database
            user = await newUser.save();

        }

        await Order.findOneAndUpdate({_id: orderId}, {$set: {userId: user._id}});

        res.json({
            message: "Admin order"
        });

        // Send notification
        await sendMail({
            to: order.email,
            subject: 'Notification Mail',
            text: `This is a notification main`,
            template: 'adminOrder',
            context: {
                username: user.name,
                message: `One order has been placed for you at https://sportsveins.com/. ${
                    password ? `Your password is ${password}`: 'Please login'
                }`,
                message2: `Total cost is ${order.price + order.shippingCost}$`,
                invoiceLink: `${CLIENT_URL}/admin/order/${orderId}`,
                paymentLink: `${CLIENT_URL}/payment/${orderId}`
            }
        });
    }
    catch(err) {
        console.log(err);
        next(err);
    }
});

// let password = 'asdfasdf';
// let order = {price: 120, shippingCost: 22};
// let orderId = '333333333333333'
// sendMail({
//     to: 'istiyak.riyad@gmail.com',
//     subject: 'Notification Mail',
//     text: `This is a notification main`,
//     template: 'adminOrder',
//     context: {
//         username: 'Md istiyak',
//         message: `One order has been placed for you at https://sportsveins.com/. ${
//             password ? `Your password is ${password}`: 'Please login'
//         }`,
//         message2: `Total cost is ${order.price + order.shippingCost}$`,
//         invoiceLink: `${CLIENT_URL}/admin/order/${orderId}`,
//         paymentLink: `${CLIENT_URL}/payment/${orderId}`
//     }
// })
// .then(data => console.log(data));

module.exports = router;