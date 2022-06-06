const router = require('express').Router();
const Template = require('../../models/template');
const pagination = require('../../lib/pagination');

router.get('/all', async (req, res, next) => {
    try {
        // Total items
        const totalCount = await Template.find().countDocuments();

        const {skip, limit} = pagination(req.query, totalCount);
        


        const templates = await Template
            .find({}, {_id: 1, name: 1, sizes: 1, price: 1, priceArray: 1, quantity: 1, featured: 1, pngImageFront: 1, pngImageBack: 1})
            .sort({_id: -1})
            .skip(skip)
            .limit(limit);


        res.json({
            message: "All templates",
            templates: {
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