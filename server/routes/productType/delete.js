const router = require('express').Router();
const ProductType = require('../../models/productType');
const {deleteImage} = require('../../lib/imageConverter');


router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        
        const type = await ProductType.findOneAndDelete({_id: id});

        res.json({
            msg: 'Product Type is deleted successfully',
        });

        if(type) {
            await Promise.all([
                ...type.layouts.map(layout => deleteImage(layout)),
                deleteImage(type.pngImageFront),
                deleteImage(type.pngImageBack)
            ]);
        }
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;