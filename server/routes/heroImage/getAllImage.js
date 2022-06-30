const router = require('express').Router();
const HeroImage = require('../../models/heroImage');


router.get('/', async (req, res, next) => {
    try {
        const images = (await HeroImage.find({}, {image: 1, _id: 0})).map(({image}) => image);


        res.json({
            message: 'Hero Images',
            data: {
                images
            }
        });
    }
    catch(error) {
        next(error)
    }
})

module.exports = router;