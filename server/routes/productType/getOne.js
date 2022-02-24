const router = require('express').Router();
const ProductType = require('../../models/productType');


router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const productType = await ProductType.findOne({_id: id}, {__v: 0});


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