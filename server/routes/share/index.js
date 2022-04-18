const router = require('express').Router();
const Product = require('../../models/product');
const Collection = require('../../models/collection');
const ProductType = require('../../models/productType');


router.get('/:link', async (req, res, next) => {
    try {
        const {link} = req.params;

        const product = await Product.findOne(
            {_id: link}, 
            {name: 1, price: 1, discount: 1, sellCount: 1, typeId: 1}
        );

        const productType = await ProductType.findOne({_id: product.typeId}, {size: 1});

        if(!product) throw Error('Product Not found');
        
        const productData = product.toJSON();
        productData.type = 'link';
        productData.size = productType.size;
        

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