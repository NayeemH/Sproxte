const router = require('express').Router();
const HeroImage = require('../../models/heroImage');
const {fileFetch, saveImage, deleteImage} = require('../../lib/imageConverter');



router.post('/', fileFetch.array('images', 100), async (req, res, next) => {
    try {

        const heroImages = (await HeroImage.find({}, {image: 1})).map(({image}) => image);
        
        await HeroImage.insertMany((
            await Promise.all(
                req.files.map(image => saveImage(image))
            )).map(image => ({image}))
        );

        await HeroImage.deleteMany({image: {$in: heroImages}});

        await Promise.all(
            heroImages.map(image => deleteImage(image))
        );


        res.json({
            message: 'Hero Images uploaded'
        });
    }
    catch(error) {
        next(error)
    }
})

module.exports = router;