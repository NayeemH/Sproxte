const router = require('express').Router();
const Collection = require('../../models/collection');
const User = require('../../models/user');
const sendNotification = require('../../lib/sendNotification');
const Project = require('../../models/project');
const Product = require('../../models/product');


router.put('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const {userId, userType} = req.user;
        const {message, points} = req.body;

        const feedbacks = {
            user: userId,
            message,
            points
        };

        let collection;
        if(userType === 'admin' || userType === 'iep') {
            collection = await Collection.findOneAndUpdate({_id: id}, {$push: {feedbacks}});
        }
        else if(userType === 'client' || userType === 'coach') {
            collection = await Collection.findOneAndUpdate({_id: id, userId}, {$push: {feedbacks}});
            if(!collection) throw Error('You can not add Feedback');
        }
        else {
            // TODO for gurdian
        }
        

        // Send notification
        const product = await Product.findOne({_id: collection.productId});

        // Order id for notification
        const project = await Project.findOne({_id: product.projectId});

        const users = await User.find({$or: [{userType: 'admin'}, {userType: 'iep'}]}, {_id: 1});
        const userIds = users.map(({_id}) => _id.toString());

        userIds.push(product.userId.toString());
        
        await sendNotification('New feedback is added', userIds, project.orderId, product.projectId, product._id);
        

        res.json({
            message: 'Feedback is added successfully',
        });
        
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;