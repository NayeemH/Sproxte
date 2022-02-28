const router = require('express').Router();
const pagination = require('../../lib/pagination');
const Template = require('../../models/template');

router.get('/', async (req, res, next) => {
    try {
        const {search_query} = req.query;

        let subQueries = [/.*/];
        if(search_query) {
            subQueries = search_query.match(/\b(\w+)\b/g).map(search => new RegExp(`${search}`, 'i'));
        }


        const totalCount = await Template.find(
            {name: {$in: subQueries}}
        ).countDocuments();


        const {skip, limit} = pagination(req.query);

        const templates = await Template
            .find(
                {name: {$in: subQueries}}, 
                {_id: 1, name: 1}
            )
            .sort({_id: -1})
            .skip(skip)
            .limit(limit);


        res.json({
            message: 'Template search result',
            templates: {
                pageCount: Math.ceil(totalCount / limit),
                itemCount: totalCount,
                items: templates
            },
        });
    }
    catch(error) {
        next(error);
    }
});



module.exports = router;