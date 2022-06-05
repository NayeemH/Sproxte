const router = require('express').Router();

const {paymentHandle} = require('../../lib/paymentHandle');


router.post('/:orderId', async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const {userId} = req.user;

        await paymentHandle({
            metadata: { userId, orderId }
        });
        
        await Order.findOneAndUpdate({_id: orderId}, {$set: { paymentStatus: 'due'}});

        res.sendStatus(200);
    }
    catch(err) {
        console.log(err);
        next(err);
    }
});



module.exports = router;