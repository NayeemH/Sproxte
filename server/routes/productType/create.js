const router = require('express').Router();
const ProductType = require('../../models/productType');
const {saveImage, fileFetch} = require('../../lib/imageConverter');



router.post('/', fileFetch.fields([{name: 'pngImageFront', maxCount: 1}, {name: 'pngImageBack', maxCount: 1}, {name: 'layouts', maxCount: 10}]), async (req, res, next) => {
    try {
        const {name, sizes, categoryType} = req.body;

        const images = await Promise.all([
            saveImage(req.files.pngImageFront[0]),
            saveImage(req.files.pngImageBack[0])
        ]);

        let layouts;
        if(req.files.layouts) {
            layouts = await Promise.all(
                req.files.layouts.map(layout => saveImage(layout))
            );
        }

        await new ProductType({
            name,
            sizes,
            categoryType,
            layouts: layouts && layouts.map(image => ({image})),
            pngImageFront: images[0],
            pngImageBack: images[1]
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