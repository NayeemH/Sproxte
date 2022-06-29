const router = require('express').Router();
const HeroImage = require('../../models/heroImage');


router.get('/', async (req, res, next) => {
    try {
        const images = (await HeroImage.find({}, {image: 1, _id: 0})).map(({image}) => image);

        const index = Math.floor(Math.random() * images.length);

        res.json({
            message: 'Hero Images',
            data: {
                image: images[index]
            }
        });
    }
    catch(error) {
        next(error)
    }
})

module.exports = router;