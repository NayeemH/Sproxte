const router = require('express').Router();
const Product = require('../../models/product');
const GurdianNotification = require('../../models/gurdianNotification');
const {fileFetch, saveImage} = require('../../lib/imageConverter');


router.post('/:id', fileFetch.single('image'), async (req, res, next) => {
    try {
        const {id} = req.params;
        const {userId} = req.user;
        const {message} = req.body;

        let product = await Product.findOne({_id: id, gurdianId: userId});
        if(!product) throw Error('Product not found for this gurdian');

        let image;
        if(req.file) {
            image = await saveImage(req.file);
        }

        const notification = await new GurdianNotification({
            message,
            image,
            projectId: product.projectId,
            productId: product._id,
            user: product.userId
        }).save();

        await Product.findOneAndUpdate({_id: id}, {$push: {gurdianNotifications: notification._id}});

        res.json({
            message: 'Reject message is sent successfully',
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;