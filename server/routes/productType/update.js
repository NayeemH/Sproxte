const router = require('express').Router();
const {saveImage, fileFetch} = require('../../lib/imageConverter');
const ProductType = require('../../models/productType');



router.patch('/:id', fileFetch.fields([{name: 'pngImage', maxCount: 1}, {name: 'svgImage', maxCount: 1}]), async (req, res, next) => {
    try {
        const {name, sizes} = req.body;
        const {id} = req.params;

        const updatedItems = {};

        if(name) {
            updatedItems.name = name;
        }

        if(sizes) {
            updatedItems.sizes = sizes;
        }

        if(req.files && req.files.pngImage) {
            const images = await saveImage(req.files.pngImage[0]);
            updatedItems.pngImage = images;
        }

        if(req.files && req.files.svgImage) {
            const images = await saveImage(req.files.svgImage[0]);
            updatedItems.svgImage = images;
        }

        await ProductType.findOneAndUpdate({_id: id}, {$set: updatedItems});

        res.json({
            success: true,
            msg: 'Product Type is updated successfully',
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;