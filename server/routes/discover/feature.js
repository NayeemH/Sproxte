const router = require('express').Router();
const Template = require('../../models/template');
const pagination = require('../../lib/pagination');


router.get('/feature', async (req, res, next) => {
    try {
        // Total items
        const totalCount = await Template.find({featured: true}).countDocuments();

        const {skip, limit} = pagination(req.query);

        const templates = await Template
            .find({featured: true}, {name: 1, pngImageFront: 1, pngImageBack: 1})
            .sort({_id: 1})
            .skip(skip)
            .limit(limit);

        res.json({
            message: "All feature templates",
            featureTemplates: {
                pageCount: Math.ceil(totalCount / limit),
                itemCount: totalCount,
                items: templates
            }
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;