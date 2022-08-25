const router = require('express').Router();
const Order = require('../../models/order');

// Stripe object
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const order = await Order.findOne({_id: id});

        if(!order) throw Error('Order not found');

        
        if(order.price + order.shippingCost < 0.5) throw Error('No need to payment');

        const clientSecret = await stripe.paymentIntents.create({
            amount: Math.round((order.price + order.shippingCost) * 100),
            currency: 'usd',
            payment_method_types: ['card'],
            metadata: {
                userId: order.userId.toString(),
                orderId: order._id.toString(),
                userName: `${order.firstName} ${order.lastName}`,
                website: "https://sportsveins.com"
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