const router = require('express').Router();
const GurdianNotification = require('../../models/gurdianNotification');
const pagination = require('../../lib/pagination');


router.get('/', async (req, res, next) => {
    try {
        const {userId} = req.user;

        const {skip, limit} = pagination(req.query);

        const totalCount = await GurdianNotification.find({user: userId}).countDocuments();

        const notifications = await GurdianNotification
            .find({user: userId}, {__v: 0, user: 0})
            .sort({_id: -1})
            .skip(skip)
            .limit(limit);


        res.json({
            message: `Notification for the coach`,
            notifications: {
                pageCount: Math.ceil(totalCount / limit),
                itemCount: totalCount,
                items: notifications
            }
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;