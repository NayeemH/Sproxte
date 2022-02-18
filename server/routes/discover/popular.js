const router = require('express').Router();
const Template = require('../../models/template');


router.get('/popular', async (req, res, next) => {
    try {
        let {page, limit} = req.query;

        limit = limit ? parseInt(limit) : 20;
        limit = limit <= 0 ? 20 : limit;

        // Total items
        const totalPage = await Template.find().countDocuments();
        page = page ? parseInt(page) : 1;
        page = page > Math.ceil(totalPage/ limit) ? Math.ceil(totalPage/ limit) : page;
        page = page <= 0 ? 1 : page;

        const start = (page - 1) * limit;

        const templates = await Template
            .find({}, {name: 1, pngImageFront: 1, pngImageBack: 1})
            .sort({sellCount: 1})
            .skip(start)
            .limit(limit);


        res.json({
            success: true,
            templates,
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;