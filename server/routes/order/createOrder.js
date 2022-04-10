const router = require('express').Router();
const Order = require('../../models/order');


router.post('/', async (req, res, next) => {
    try {
        const {userId} = req.user;
        const {
            address, 
            phone, 
            email,
            firstName,
            lastName,
            city,
            country,
            state,
            zip,
            teamInfo
        } = req.body;

        const order = await new Order({
            userId,
            address, 
            phone, 
            email,
            firstName,
            lastName,
            city,
            country,
            state,
            zip,
            teamInfo
        }).save();


        res.json({
            message: 'Order is created',
            orderId: order._id
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;