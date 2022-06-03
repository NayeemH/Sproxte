const router = require('express').Router();
const Order = require('../../models/order');
const {trackingInfo} = require('../../lib/shipping');


router.get('/:orderId', async (req, res, next) => {
    try {
        const {orderId} = req.params;

        const order = await Order.findOne({_id: orderId});
        if(!order) throw Error('Order not found');


        const trackingData = await trackingInfo(order.masterTrackingNumber);
        

        res.json({
            message: 'Tracking Data',
            trackingInfo: trackingData,
            trackingNumber: order.masterTrackingNumber
        });
    }
    catch(error) {
        next(error);
    }
});


module.exports = router;