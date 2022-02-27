const router = require('express').Router();
const {saveImage, fileFetch} = require('../../lib/imageConverter');
const ProductType = require('../../models/productType');



router.patch('/:id', fileFetch.fields([{name: 'pngImageFront', maxCount: 1}, {name: 'pngImageBack', maxCount: 1}]), async (req, res, next) => {
    try {
        const {name, sizes, categoryType} = req.body;
        const {id} = req.params;

        const updatedItems = {};

        if(name) {
            updatedItems.name = name;
        }

        if(sizes) {
            updatedItems.sizes = sizes;
        }

        if(categoryType) {
            updatedItems.categoryType = categoryType;
        }

        if(req.files && req.files.pngImageFront) {
            const images = await saveImage(req.files.pngImageFront[0]);
            updatedItems.pngImageFront = images;
        }

        if(req.files && req.files.pngImageBack) {
            const images = await saveImage(req.files.pngImageBack[0]);
            updatedItems.pngImageBack = images;
        }

        await ProductType.findOneAndUpdate({_id: id}, {$set: updatedItems});

        res.json({
            success: true,
            message: 'Product Type is updated successfully',
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;