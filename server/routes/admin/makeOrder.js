const router = require('express').Router();
const Order = require('../../models/order');

const {paymentHandle} = require('../../lib/paymentHandle');


router.post('/:orderId', async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const {userId} = req.user;

        await paymentHandle({
            metadata: { userId, orderId }
        });
        
        const order = await Order.findOneAndUpdate({_id: orderId}, {$set: { paymentStatus: 'due'}});

        res.json({
            message: "Admin order",
            order
        });
    }
    catch(err) {
        console.log(err);
        next(err);
    }
});



module.exports = router;