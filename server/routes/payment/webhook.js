const router = require('express').Router();

const {STRIPE_WEBHOOK_SECRET} = process.env;

router.post('/', async (req, res, next) => {
    try {

        const signature = req.headers['stripe-signature'];

        const {type: eventType, data} = stripe.webhooks.constructEvent(
            req.rawBody,
            signature,
            STRIPE_WEBHOOK_SECRET
        );

        if(eventType === 'payment_intent.succeeded') {
            const paymentIntent = data.object;
            console.log(paymentIntent);
        }
        else {
            console.log(`Unhandled event type ${eventType}`);
        }

        res.sendStatus(200);
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;