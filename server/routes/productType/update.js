const router = require('express').Router();
const {saveImage, fileFetch} = require('../../lib/imageConverter');
const ProductType = require('../../models/productType');



router.patch('/:id', fileFetch.fields([{name: 'pngImageFront', maxCount: 1}, {name: 'pngImageBack', maxCount: 1}, {name: 'layouts', maxCount: 10}, {name: 'images', maxCount: 10}, {name: 'fontImages', maxCount: 10}]), async (req, res, next) => {
    try {
        const {name, sizes, categoryType, price, priceArray, weight, colors, discount} = req.body;
        const {id} = req.params;

        const updatedItems = {};

        if(name) {
            updatedItems.name = name;
        }

        if(sizes) {
            updatedItems.sizes = sizes;
        }

        if(price) {
            updatedItems.price = price;
        }
        
        if(discount) {
            updatedItems.discount = JSON.parse(discount);
        }

        if(priceArray) {
            updatedItems.priceArray = JSON.parse(priceArray);
        }

        if(weight) {
            updatedItems.weight = weight;
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

        if(req.files && req.files.layouts) {
            const images = await Promise.all(
                req.files.layouts.map(layout => saveImage(layout))
            );

            updatedItems.layouts = images.map(image => ({image}));
        }

        if(req.files && req.files.fontImages) {
            const images = await Promise.all(
                req.files.fontImages.map(image => saveImage(image))
            );

            updatedItems.fontImages = images.map(image => ({image}));
        }

        
        if(req.files.images) {
            const images = await Promise.all(
                req.files.images.map(image => saveImage(image))
            );
            
            updatedItems.imageData = images.map((image, i) => ({color: colors[i], image}));
        }

        const types = await ProductType.findOneAndUpdate({_id: id}, {$set: updatedItems});

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