const router = require('express').Router();
const Product = require('../../models/product');
const User = require('../../models/user');
const Collection = require('../../models/collection');
const sendNotification = require('../../lib/sendNotification');



router.patch('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const {userId, userType} = req.user;

        let product;
        if(userType === 'admin') {
            const collections = await Collection.find({productId: id}, {image: 1});

            product = await Product.findOneAndUpdate({_id: id}, {$set: 
                {
                    status: 'approved',
                    finalImage: collections.length ? collections[collections.length - 1].image : null
                }
            });
        }
        else if(userType === 'client' || userType === 'coach') {
            const collections = await Collection.find({productId: id}, {image: 1});

            product = await Product.findOneAndUpdate({_id: id, userId}, {$set: 
                {
                    status: 'approved',
                    finalImage: collections.length ? collections[collections.length - 1].image : null
                }
            });

            if(!product) throw Error('You can not approved product');
        }
        else {
            // TODO for gurdian
        }
        
        // Send notification
        const users = await User.find({$or: [{userType: 'admin'}, {userType: 'iep'}]}, {_id: 1});
        const userIds = users.map(({_id}) => _id.toString());

        userIds.push(product.userId);
        
        await sendNotification('Product approved', userIds, product.projectId, product._id);

        res.json({
            message: 'Feedback is added successfully',
        });
        
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;