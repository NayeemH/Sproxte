const router = require('express').Router();
const Collection = require('../../models/collection');
const Product = require('../../models/product');
const {fileFetch} = require('../../lib/imageConverter');
const User = require('../../models/user');
const sendNotification = require('../../lib/sendNotification');
const imageMerge = require('../../lib/imageMerge');
const path = require('path');
const fs = require('fs/promises');


router.post('/:id', fileFetch.single('image'), async (req, res, next) => {
    try {
        const {id} = req.params;
        const {userId, userType} = req.user;
        const {title} = req.body;

        const product = await Product.findOne({_id: id});
        if(product.status === 'approved') throw Error('This product is already approved');


        const parentImage = await fs.readFile(path.resolve(`data/image/small/${product.colorImage}`));

        const mergeImage = await imageMerge(parentImage, req.file.buffer);

        if(userType === 'admin' || userType === 'iep') {
            await new Collection({
                userId,
                productId: id,
                title,
                image: mergeImage
            }).save();

            await Product.findOneAndUpdate({_id: id}, {$set: {status: 'working'}});
        }
        else {
            throw Error('You can not add collection');
        }

        // Send notification
        const users = await User.find({$or: [{userType: 'admin'}, {userType: 'iep'}]}, {_id: 1});
        const userIds = users.map(({_id}) => _id.toString());

        userIds.push(product.userId.toString());
        
        await sendNotification('Uploaded new preview file for you', users, product.projectId, product._id);
        
        res.json({
            message: 'Collection is added successfully',
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;