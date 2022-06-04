const router = require('express').Router();
const stripe = require('stripe');

const {addPlayerHandle, paymentHandle} = require('../../lib/paymentHandle');


const {STRIPE_WEBHOOK_SECRET} = process.env;

router.post('/', async (req, res, next) => {
    try {
        const signature = req.headers['stripe-signature'];

        // Checking the signature
        const {type: eventType, data} = stripe.webhooks.constructEvent(
            req.rawBody,
            signature,
            STRIPE_WEBHOOK_SECRET
        );

        // Create project and product if payment is successfull
        if(eventType === 'payment_intent.succeeded') {
            const {type} = data.object.metadata;

            if(type === 'newPlayerAdd') {
                await addPlayerHandle(data.object);
            }
            else {
                await paymentHandle(data.object);
            }
        }
        else {
            console.log(`Unhandled event type ${eventType}`);
        }

        res.sendStatus(200);
    }
    catch(err) {
        console.log(err);
        next(err);
    }
});



module.exports = router;