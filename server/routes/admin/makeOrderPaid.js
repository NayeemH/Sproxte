const router = require('express').Router();
const Order = require('../../models/order');
const Project = require('../../models/project');

router.patch('/:orderId', async (req, res, next) => {
    try {
        const { orderId } = req.params;

        
        const order = await Order.findOneAndUpdate({_id: orderId}, {$set: { paymentStatus: 'paid'}});
        await Project.findOneAndUpdate({_id: order.projectId}, {$set: {isPaid: true}});

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