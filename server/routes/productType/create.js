const router = require('express').Router();
const ProductType = require('../../models/productType');
const {saveImage, fileFetch} = require('../../lib/imageConverter');



router.post('/', fileFetch.fields([{name: 'pngImage', maxCount: 1}, {name: 'svgImage', maxCount: 1}]), async (req, res, next) => {
    try {
        const {name, sizes} = req.body;

        const images1 = await saveImage(req.files.pngImage[0]);
        const images2 = await saveImage(req.files.svgImage[0]);


        const type = await new ProductType({
            name,
            sizes,
            pngImage: images1,
            svgImage: images2
        }).save();

        res.json({
            success: true,
            msg: 'Product Type is added successfully',
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;