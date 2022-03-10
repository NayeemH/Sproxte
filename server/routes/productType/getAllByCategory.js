const router = require('express').Router();
const ProductType = require('../../models/productType');


router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const productType = await ProductType.find({categoryType: id}, {__v: 0, layouts: 0});


        res.json({
            message: "Product Types with given category id",
            types: productType,
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;