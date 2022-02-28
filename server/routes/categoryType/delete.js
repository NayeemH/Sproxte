const router = require('express').Router();
const CategoryType = require('../../models/categoryType');
const {deleteImage} = require('../../lib/imageConverter');


router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        
        const category = await CategoryType.findOneAndDelete({_id: id});

        res.json({
            message: 'Product Type is deleted successfully',
        });

        if(category) {
            await Promise.all([
                deleteImage(category.pngImage),
                deleteImage(category.svgImage)
            ]);
        }
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;