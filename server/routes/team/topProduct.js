const router = require('express').Router();
const Product = require('../../models/product');
const Collection = require('../../models/collection');


router.get('/', async (req, res, next) => {
    try {
        const products = await Product
            .find({type: 'team', sellCount: {$ne: 0}}, {_id: 1, name: 1, price: 1, sellCount: 1})
            .sort({sellCount: -1})
            .limit(10);
        
        const finalProducts = []; 

        await Promise.all(
            products.map(product => (async () =>{
                const collections = await Collection
                .find({productId: product._id}, {_id: 1, image: 1})
                .sort({_id: -1})
                .limit(1);

                finalProducts.push({
                    ...product.toJSON(),
                    count: product.sellCount,
                    image: collections[0] && collections[0].image
                });
            })())
        )
        
        res.json({
            message: 'Products Data',
            data: finalProducts
        });
    }
    catch(error) {
        next(error);
    }
});



module.exports = router;