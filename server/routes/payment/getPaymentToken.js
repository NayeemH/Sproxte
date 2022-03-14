const router = require('express').Router();
const Order = require('../../models/order');

// Stripe object
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/:id', async (req, res, next) => {
    try {
        const {userId} = req.user;
        const {id} = req.params;

        const order = await Order.findOne({_id: id, userId});

        if(!order) throw Error('Order not found');

        
        if(order.price < 1) throw Error('No need to payment');

        const clientSecret = await stripe.paymentIntents.create({
            amount: Math.round(order.price * 100),
            currency: 'usd',
            payment_method_types: ['card'],
            metadata: {
                userId,
                orderId: order._id.toString(),
            }
        });

        res.json({
            message: 'Payment Token is created',
            clientSecret: clientSecret.client_secret
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;