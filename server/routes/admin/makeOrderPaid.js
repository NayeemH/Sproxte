const router = require('express').Router();
const Order = require('../../models/order');
const Project = require('../../models/project');
const {paymentHandle} = require('../../lib/paymentHandle');

router.patch('/:orderId', async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const {userId} = req.user;

        await paymentHandle({
            metadata: { userId, orderId }
        });


        const order = await Order.findOneAndUpdate({_id: orderId}, {$set: { paymentStatus: 'paid'}});
        
        
        await Project.findOneAndUpdate({_id: order.projectId}, {$set: {isPaid: true, isAdmin: true}});

        res.json({
            message: 'Order paid'
        });
    }
    catch(err) {
        console.log(err);
        next(err);
    }
});



module.exports = router;