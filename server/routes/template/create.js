const router = require('express').Router();
const Template = require('../../models/template');
const {saveImage, fileFetch} = require('../../lib/imageConverter');



router.post('/', fileFetch.fields([{name: 'pngImageFront', maxCount: 1}, {name: 'pngImageBack', maxCount: 1}]), async (req, res, next) => {
    try {
        const {name, sizes, price, description, quantity, featured} = req.body;

        const images1 = await saveImage(req.files.pngImageFront[0]);
        const images2 = await saveImage(req.files.pngImageBack[0]);


        const type = await new Template({
            name,
            sizes,
            pngImageFront: images1,
            pngImageBack: images2,
            price,
            description,
            quantity,
            featured
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