const router = require('express').Router();
const ProductType = require('../../models/productType');


router.get('/', async (req, res, next) => {
    try {
        const productType = await ProductType.find({}, {__v: 0});


        res.json({
            success: true,
            types: productType,
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;