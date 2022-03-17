const router = require('express').Router();
const Product = require('../../models/product');
const User = require('../../models/user');
const sendNotification = require('../../lib/sendNotification');



router.patch('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const {userId, userType} = req.user;

        let product;
        if(userType === 'admin') {
            product = await Product.findOneAndUpdate({_id: id}, {$set: {status: 'approved'}});
        }
        else if(userType === 'client' || userType === 'coach') {
            product = await Product.findOneAndUpdate({_id: id, userId}, {$set: {status: 'approved'}});

            if(!product) throw Error('You can not approved product');
        }
        else {
            // TODO for gurdian
        }
        
        // Send notification
        const users = await User.find({$or: [{userType: 'admin'}, {userType: 'iep'}]}, {_id: 1});
        const userIds = users.map(({_id}) => _id.toString());

        userIds.push(product.userId);
        
        await sendNotification('Product approved', users, product.projectId, product._id);

        res.json({
            message: 'Feedback is added successfully',
        });
        
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;