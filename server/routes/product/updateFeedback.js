const router = require('express').Router();
const Collection = require('../../models/collection');
const User = require('../../models/user');
const sendNotification = require('../../lib/sendNotification');
const Product = require('../../models/product');


router.patch('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const {userId, userType} = req.user;
        const {message, feedbackId} = req.body;


        let collection;
        if(userType === 'admin') {
            collection = await Collection.findOneAndUpdate({_id: id, 'feedbacks._id': feedbackId}, {$set: {'feedbacks.$.message': message}});
        }
        else if(userType === 'client' || userType === 'coach') {
            collection = await Collection.findOneAndUpdate({_id: id, 'feedbacks.user': userId, 'feedbacks._id': feedbackId}, {$set: {'feedbacks.$.message': message}});
            if(!collection) throw Error('You can not add Feedback');
        }
        else {
            // TODO for gurdian
        }
        

        // Send notification
        const product = await Product.findOne({_id: collection.productId});

        const users = await User.find({$or: [{userType: 'admin'}, {userType: 'iep'}]}, {_id: 1});
        const userIds = users.map(({_id}) => _id.toString());

        userIds.push(product.userId.toString());
        
        await sendNotification('New feedback is updated', userIds, product.projectId, product._id);
        

        res.json({
            message: 'Feedback is added successfully',
        });
        
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;