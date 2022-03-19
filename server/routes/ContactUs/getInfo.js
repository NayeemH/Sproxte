const router = require('express').Router();
const pagination = require('../../lib/pagination');
const ContactUs = require('../../models/contactUs');


router.get('/', async (req, res, next) => {
    try {
        const {skip, limit} = pagination(req.query);

        const totalCount = await ContactUs.find({}).countDocuments();

        const contact = await ContactUs
            .find({})
            .sort({_id: -1})
            .skip(skip)
            .limit(limit);

        res.json({
            message: 'Contact infos',
            contact: {
                pageCount: Math.ceil(totalCount / limit),
                itemCount: totalCount,
                items: contact
            }
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;