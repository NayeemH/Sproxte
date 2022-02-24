const router = require('express').Router();
const ProductType = require('../../models/productType');



router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        
        await ProductType.findOneAndDelete({_id: id});

        res.json({
            success: true,
            msg: 'Product Type is deleted successfully',
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;