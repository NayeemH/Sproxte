const router = require('express').Router();
const Order = require('../../models/order');



router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;


        const order = await Order
            .findOne({_id: id}, {__v: 0})
            .populate('userId', '_id name image');


        res.json({
            message: `One order details`,
            order
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;