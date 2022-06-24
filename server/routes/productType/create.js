const router = require('express').Router();
const ProductType = require('../../models/productType');
const {saveImage, fileFetch} = require('../../lib/imageConverter');



router.post('/', fileFetch.fields([{name: 'pngImageFront', maxCount: 1}, {name: 'pngImageBack', maxCount: 1}, {name: 'layouts', maxCount: 10}, {name: 'images', maxCount: 10}, {name: 'fontImages', maxCount: 10}]), async (req, res, next) => {
    try {
        const {name, sizes, categoryType, price, priceArray: tempPriceArray, discount: tempDiscount, weight, playerAddPrice, colors} = req.body;
        const priceArray = JSON.parse(tempPriceArray);
        const discount = JSON.parse(tempDiscount);
        
        const frontImage = await saveImage(req.files.pngImageFront[0]);

        let backImage;
        if(req.files.pngImageBack) {
            backImage = await saveImage(req.files.pngImageBack[0]);
        }

        let layouts;
        if(req.files.layouts) {
            layouts = await Promise.all(
                req.files.layouts.map(layout => saveImage(layout))
            );
        }

        let fontImages;
        if(req.files.fontImages) {
            fontImages = await Promise.all(
                req.files.fontImages.map(image => saveImage(image))
            );
        }

        let imageData;
        if(req.files.images ) {
            const images = await Promise.all(
                req.files.images.map(image => saveImage(image))
            );
            
            imageData = images.map((image, i) => ({color: colors[i], image}))
        }

        await new ProductType({
            name,
            sizes,
            price,
            priceArray,
            discount,
            weight,
            categoryType,
            imageData,
            layouts: layouts && layouts.map(image => ({image})),
            fontImages,
            pngImageFront: frontImage,
            pngImageBack: backImage,
            playerAddPrice
        }).save();

        res.json({
            msg: 'Product Type is added successfully',
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;