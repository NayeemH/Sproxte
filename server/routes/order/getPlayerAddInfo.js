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
                totalCount = await Order.find({deleveryStatus: {$ne: 'delivered'}, playerAddPrice: { $exists: true, $not: {$size: 0} }, paymentStatus: 'paid'}).countDocuments();

                orders = await Order
                    .find({deleveryStatus: {$ne: 'delivered'}, playerAddPrice: { $exists: true, $not: {$size: 0} }, paymentStatus: 'paid'}, {_id: 1, projectId: 1, userId: 1, playerAddPrice: 1})
                    .sort({_id: -1})
                    .skip(skip)
                    .limit(limit)
                    .populate('userId', '_id name image');
            }
            else if(type === 'completed'){
                totalCount = await Order.find({deleveryStatus: 'delivered', playerAddPrice: { $exists: true, $not: {$size: 0} }, paymentStatus: 'paid'}).countDocuments();

                orders = await Order
                    .find({deleveryStatus: 'delivered', playerAddPrice: { $exists: true, $not: {$size: 0} }, paymentStatus: 'paid'}, {_id: 1, projectId: 1, userId: 1, playerAddPrice: 1})
                    .sort({_id: -1})
                    .skip(skip)
                    .limit(limit)
                    .populate('userId', '_id name image');
            }
            else return next();
        }
        else if(userType === 'client' || userType === 'coach' || userType === 'gurdian') {
            if(type === 'active') {
                totalCount = await Order.find({deleveryStatus: {$ne: 'delivered'}, playerAddPrice: { $exists: true, $not: {$size: 0} }, userId, paymentStatus: 'paid'}).countDocuments();

                orders = await Order
                    .find({deleveryStatus: {$ne: 'delivered'}, playerAddPrice: { $exists: true, $not: {$size: 0} }, userId, paymentStatus: 'paid'}, {_id: 1, projectId: 1, userId: 1, playerAddPrice: 1})
                    .sort({_id: -1})
                    .skip(skip)
                    .limit(limit)
                    .populate('userId', '_id name image');
            }
            else if(type === 'completed'){
                totalCount = await Order.find({deleveryStatus: 'delivered', playerAddPrice: { $exists: true, $not: {$size: 0} }, userId, paymentStatus: 'paid'}).countDocuments();

                orders = await Order
                    .find({deleveryStatus: 'delivered', playerAddPrice: { $exists: true, $not: {$size: 0} }, userId, paymentStatus: 'paid'}, {_id: 1, projectId: 1, userId: 1, playerAddPrice: 1})
                    .sort({_id: -1})
                    .skip(skip)
                    .limit(limit)
                    .populate('userId', '_id name image');
            }
            else return next();
        }


        
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