const router = require('express').Router();
const Notification = require('../../models/notification');
const pagination = require('../../lib/pagination');


router.get('/', async (req, res, next) => {
    try {
        const {userId} = req.user;

        const {skip, limit} = pagination(req.query);

        const totalCount = await Notification.find({users: userId}).countDocuments();

        const notifications = await Notification
            .find({users: userId}, {__v: 0, users: 0})
            .sort({_id: -1})
            .skip(skip)
            .limit(limit)
            .populate('user', '_id name image');


        res.json({
            message: `Notification for the user`,
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