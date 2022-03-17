const router = require('express').Router();
const User = require('../../models/user');
const pagination = require('../../lib/pagination');


router.get('/', async (req, res, next) => {
    try {
        const {skip, limit} = pagination(req.query);

        const totalCount = await User.find({userType: 'iep'}).countDocuments();

        const users = await User
            .find({userType: 'iep'}, {__v: 0, password: 0, verified: 0, sessions: 0, orderHistory: 0, saveDesign: 0})
            .sort({_id: -1})
            .skip(skip)
            .limit(limit);


        res.json({
            message: `User info`,
            users: {
                pageCount: Math.ceil(totalCount / limit),
                itemCount: totalCount,
                items: users
            }
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;