const router = require('express').Router();


router.get('/', async (req, res, next) => {
    try {
        res.json({
            message: 'Public payment key',
            paymentKey: process.env.STRIPE_PUBLISHABLE_KEY
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;