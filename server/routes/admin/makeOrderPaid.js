const router = require('express').Router();
const Order = require('../../models/order');

router.patch('/:orderId', async (req, res, next) => {
    try {
        const { orderId } = req.params;

        
        await Order.findOneAndUpdate({_id: orderId}, {$set: { paymentStatus: 'paid'}});

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