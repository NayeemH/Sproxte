const router = require('express').Router();
const Product = require('../../models/product');
const Collection = require('../../models/collection');


router.get('/:link', async (req, res, next) => {
    try {
        const {link} = req.params;

        const product = await Product.findOne(
            {_id: link}, 
            {name: 1, price: 1, discount: 1, sellCount: 1}
        );

        if(!product) throw Error('Product Not found');
        
        const productData = product.toJSON();

        const collections = await Collection.find({productId: product._id}, {image: 1});

        productData.image = collections[collections.length - 1].image;

        res.json({
            message: 'Share data',
            data: productData
        });
    }
    catch(error) {
        next(error);
    }
});



module.exports = router;