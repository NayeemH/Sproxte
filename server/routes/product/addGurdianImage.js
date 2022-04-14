const router = require('express').Router();
const User = require('../../models/user');
const Product = require('../../models/product');
const {fileFetch, saveImage} = require('../../lib/imageConverter');
const sendNotification = require('../../lib/sendNotification');


router.post('/:id', fileFetch.single('image'), async (req, res, next) => {
    try {
        const {id} = req.params;
        const {userType, userId} = req.user;

        let product;
        if(userType === 'admin' || userType === 'coach') {
            const image = await saveImage(req.file);

            product = await Product.findOneAndUpdate({_id: id}, {$push: {frontImages: image}});
            if(!product) throw Error('Product not found')
        }
        else {
            throw Error('You can not add image');
        }

        // Send notification
        const users = await User.find({$or: [{userType: 'admin'}, {userType: 'iep'}]}, {_id: 1});
        const userIds = users.map(({_id}) => _id.toString());

        userIds.push(product.userId.toString());
        if(product.gurdianId) {
            userIds.push(product.gurdianId.toString());
        }
        
        await sendNotification('Gurdian add a image', userIds, product.projectId, product._id);
        
        res.json({
            message: 'Image is added successfully',
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;