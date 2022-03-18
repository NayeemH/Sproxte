const router = require('express').Router();
const pagination = require('../../lib/pagination');
const Order = require('../../models/order');



router.get('/:type', async (req, res, next) => {
    try {
        const {userId, userType} = req.user;
        const {type} = req.params;


        // Data for pagination
        let totalCount;

        const {skip, limit} = pagination(req.query);

        let orders;
        if(userType === 'admin' || userType === 'iep') {
            if(type === 'active') {
                totalCount = await Order.find({deleveryStatus: {$ne: 'delivered'}, paymentStatus: 'paid'}).countDocuments();

                orders = await Order
                    .find({deleveryStatus: {$ne: 'delivered'}, paymentStatus: 'paid'}, {__v: 0, orders: 0})
                    .sort({_id: -1})
                    .skip(skip)
                    .limit(limit)
                    .populate('userId', '_id name image');
            }
            else if(type === 'completed'){
                totalCount = await Order.find({deleveryStatus: 'delivered', paymentStatus: 'paid'}).countDocuments();

                orders = await Order
                    .find({deleveryStatus: 'delivered', paymentStatus: 'paid'}, {__v: 0, orders: 0})
                    .sort({_id: -1})
                    .skip(skip)
                    .limit(limit)
                    .populate('userId', '_id name image');
            }
            else return next();
        }
        else if(userType === 'client' || userType === 'coach') {
            if(type === 'active') {
                totalCount = await Order.find({deleveryStatus: {$ne: 'delivered'}, userId, paymentStatus: 'paid'}).countDocuments();

                orders = await Order
                    .find({deleveryStatus: {$ne: 'delivered'}, userId, paymentStatus: 'paid'}, {__v: 0, orders: 0})
                    .sort({_id: -1})
                    .skip(skip)
                    .limit(limit)
                    .populate('userId', '_id name image');
            }
            else if(type === 'completed'){
                totalCount = await Order.find({deleveryStatus: 'delivered', userId, paymentStatus: 'paid'}).countDocuments();

                orders = await Order
                    .find({deleveryStatus: 'delivered', userId, paymentStatus: 'paid'}, {__v: 0, orders: 0})
                    .sort({_id: -1})
                    .skip(skip)
                    .limit(limit)
                    .populate('userId', '_id name image');
            }
            else return next();
            totalCount = await Order.find({deleveryStatus, userId, paymentStatus: 'paid'}).countDocuments();

            orders = await Order
                .find({deleveryStatus, userId, paymentStatus: 'paid'}, {__v: 0, orders: 0})
                .sort({_id: -1})
                .skip(skip)
                .limit(limit)
                .populate('userId', '_id name image');
        }

        // No payment list for gurdian

        
        res.json({
            message: `${type} Order for ${userType}`,
            orders: {
                pageCount: Math.ceil(totalCount / limit),
                itemCount: totalCount,
                items: orders
            }
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;