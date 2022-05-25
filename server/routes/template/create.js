const router = require('express').Router();
const Template = require('../../models/template');
const {saveImage, fileFetch} = require('../../lib/imageConverter');



router.post('/', fileFetch.fields([{name: 'pngImageFront', maxCount: 1}, {name: 'pngImageBack', maxCount: 1}, {name: 'layouts', maxCount: 10}]), async (req, res, next) => {
    try {
        const {name, sizes, price, priceArray, discount, weight, description, quantity, featured, colors, productType} = req.body;

        const images1 = await saveImage(req.files.pngImageFront[0]);

        let images2, layouts;
        if(req.files.pngImageBack) {
            images2 = await saveImage(req.files.pngImageBack[0]);
        }

        if(req.files.layouts) {
            layouts = await Promise.all(
                req.files.layouts.map(layout => saveImage(layout))
            );
        }

        const type = await new Template({
            name,
            sizes,
            pngImageFront: images1,
            pngImageBack: images2,
            price,
            priceArray,
            discount,
            weight,
            description,
            quantity,
            featured,
            layouts: layouts && layouts.map(image => ({image})),
            colors,
            productType
        }).save();

        res.json({
            success: true,
            msg: 'Template is added successfully',
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;