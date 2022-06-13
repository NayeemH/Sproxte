const router = require('express').Router();
const Order = require('../../models/order');
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
                username: order.name,
                message: 'One order has been placed for you at https://sportsveins.com/',
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



module.exports = router;