const router = require('express').Router();
const Product = require('../../models/product');
const Collection = require('../../models/collection');



router.get('/:id', async (req, res, next) => {
    try {
        const {userId, userType} = req.user;
        const {id} = req.params;


        let product, collections;
        if(userType === 'admin' || userType === 'iep') {
            product = await Product.findOne(
                {_id: id}, 
                {__v: 0}
            )
            .populate('gurdianNotifications', 'message image createdAt updatedAt');

            collections = await Collection
                .find({productId: product._id}, {__v: 0})
                .populate('feedbacks.user', '_id name image userType');
        }
        else if(userType === 'client' || userType === 'coach') {
            product = await Product.findOne(
                {_id: id, $or: [{userId}, {gurdianIds: userId}]}, 
                {__v: 0}
            )
            .populate('gurdianNotifications', 'message image createdAt updatedAt');

            if(!product) throw Error('You are not authorized in this product or not exist');

            collections = await Collection
                .find({productId: product._id}, {__v: 0})
                .populate('feedbacks.user', '_id name image userType');
        }
        else if(userType === 'guardian') {
            // TODO: fetch for guardian 
        }


        res.json({
            message: `Product for ${userType}`,
            data: {
                product,
                collections
            }
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;