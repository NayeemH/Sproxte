const router = require('express').Router();
const Template = require('../../models/template');


router.get('/', async (req, res, next) => {
    try {
        const popularTemplates = await Template
            .find({}, {name: 1, pngImageFront: 1, pngImageBack: 1})
            .sort({sellCount: 1})
            .skip(0)
            .limit(3);

        const featureTemplates = await Template
            .find({featured: true}, {name: 1, pngImageFront: 1, pngImageBack: 1})
            .sort({_id: 1})
            .skip(0)
            .limit(3);

        const recentTemplates = await Template
            .find({}, {name: 1, pngImageFront: 1, pngImageBack: 1})
            .sort({_id: 1})
            .skip(0)
            .limit(3);

        res.json({
            success: true,
            templates: {
                popular: popularTemplates,
                feature: featureTemplates,
                recent: recentTemplates
            }
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;