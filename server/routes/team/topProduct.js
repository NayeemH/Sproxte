const router = require('express').Router();
const Project = require('../../models/project');
const Product = require('../../models/product');


router.get('/', async (req, res, next) => {
    try {
        const products = await Product
            .find({type: 'team'})
            .sort({sellCount: 1})
            .limit(10);

        res.json({
            message: 'Products Data',
            data: products
        });
    }
    catch(error) {
        next(error);
    }
});



module.exports = router;