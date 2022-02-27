const router = require('express').Router();
const CategoryType = require('../../models/categoryType');
const {saveImage, fileFetch} = require('../../lib/imageConverter');



router.post('/', fileFetch.fields([{name: 'pngImage', maxCount: 1}, {name: 'svgImage', maxCount: 1}]), async (req, res, next) => {
    try {
        const {name} = req.body;

        const images = await Promise.all([
            saveImage(req.files.pngImage[0]),
            saveImage(req.files.svgImage[0])
        ]);


        await new CategoryType({
            name,
            pngImage: images[0],
            svgImage: images[1]
        }).save();

        res.json({
            message: 'Category Type is added successfully',
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;