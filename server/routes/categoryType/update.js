const router = require('express').Router();
const {saveImage, fileFetch, deleteImage} = require('../../lib/imageConverter');
const CategoryType = require('../../models/categoryType');



router.patch('/:id', fileFetch.fields([{name: 'pngImage', maxCount: 1}, {name: 'svgImage', maxCount: 1}]), async (req, res, next) => {
    try {
        const {name} = req.body;
        const {id} = req.params;

        const updatedItems = {};

        if(name) {
            updatedItems.name = name;
        }

        if(req.files && req.files.pngImage) {
            const images = await saveImage(req.files.pngImage[0]);
            updatedItems.pngImage = images;
        }

        if(req.files && req.files.svgImage) {
            const images = await saveImage(req.files.svgImage[0]);
            updatedItems.svgImage = images;
        }

        const category = await CategoryType.findOneAndUpdate({_id: id}, {$set: updatedItems});

        res.json({
            success: true,
            message: 'Product Type is updated successfully',
        });

        // Delete the files
        if(category) {
            if(req.files && req.files.pngImage) {
                await deleteImage(category.pngImage);
            }
    
            if(req.files && req.files.svgImage) {
                await deleteImage(category.svgImage);
            }
        }
        
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;