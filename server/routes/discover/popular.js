const router = require('express').Router();
const Template = require('../../models/template');
const pagination = require('../../lib/pagination');


router.get('/popular', async (req, res, next) => {
    try {
        // Total items
        const totalCount = await Template.find().countDocuments();

        const {skip, limit} = pagination(req.query);

        const templates = await Template
            .find({}, {name: 1, pngImageFront: 1, pngImageBack: 1})
            .sort({sellCount: 1})
            .skip(skip)
            .limit(limit);


        res.json({
            message: "All popular templates",
            popularTemplates: {
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