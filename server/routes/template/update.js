const router = require('express').Router();
const {saveImage, fileFetch} = require('../../lib/imageConverter');
const Template = require('../../models/template');



router.patch('/:id', fileFetch.fields([{name: 'pngImageFront', maxCount: 1}, {name: 'pngImageBack', maxCount: 1}, , {name: 'layouts', maxCount: 10}]), async (req, res, next) => {
    try {
        const {name, sizes, price, description, quantity, featured, colors, productType} = req.body;
        const {id} = req.params;

        const updatedItems = {};

        if(name) updatedItems.name = name;
        if(sizes) updatedItems.sizes = sizes;
        if(price) updatedItems.price = price;
        if(description) updatedItems.description = description;
        if(quantity) updatedItems.quantity = quantity;
        if(featured) updatedItems.featured = featured;
        if(colors) updatedItems.colors = colors;
        if(productType) updatedItems.productType = productType;

        if(req.files && req.files.layouts) {
            const images = await Promise.all([
                req.files.layouts.map(layout => saveImage(layout))
            ]);

            updatedItems.layouts = images.map(image => ({image}));
        }

        if(req.files && req.files.pngImageFront) {
            const images = await saveImage(req.files.pngImageFront[0]);
            updatedItems.pngImageFront = images;
        }

        if(req.files && req.files.pngImageBack) {
            const images = await saveImage(req.files.pngImageBack[0]);
            updatedItems.pngImageBack = images;
        }

        await Template.findOneAndUpdate({_id: id}, {$set: updatedItems});

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