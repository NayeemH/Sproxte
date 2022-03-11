const router = require('express').Router();
const ProductType = require('../../models/productType');
const {saveImage, fileFetch} = require('../../lib/imageConverter');



router.post('/', fileFetch.fields([{name: 'pngImageFront', maxCount: 1}, {name: 'pngImageBack', maxCount: 1}, {name: 'layouts', maxCount: 10}]), async (req, res, next) => {
    try {
        const {name, sizes, categoryType, price, discount} = req.body;

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

        await new ProductType({
            name,
            sizes,
            price,
            discount,
            categoryType,
            layouts: layouts && layouts.map(image => ({image})),
            pngImageFront: frontImage,
            pngImageBack: backImage
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