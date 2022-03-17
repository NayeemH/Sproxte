const router = require('express').Router();
const Collection = require('../../models/collection');
const Product = require('../../models/product');
const {saveImage, fileFetch} = require('../../lib/imageConverter');


router.post('/:id', fileFetch.single('image'), async (req, res, next) => {
    try {
        const {id} = req.params;
        const {userId, userType} = req.user;
        const {title} = req.body;

        const product = await Product.findOne({_id: id});
        if(product.status === 'approved') throw Error('This product is already approved');


        let image;
        if(req.file) {
            image = await saveImage(req.file);
        }

        if(userType === 'admin' || userType === 'iep') {
            await new Collection({
                userId,
                productId: id,
                title,
                image
            }).save();

            await Product.findOneAndUpdate({_id: id}, {$set: {status: 'working'}});
        }
        else {
            throw Error('You can not add collection');
        }
        res.json({
            message: 'Collection is added successfully',
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;