const router = require('express').Router();
const User = require('../../models/user');




router.get('/', async (req, res, next) => {
    try {
        const {userId} = req.user;
        
        const user = await User.findOne({_id: userId}, {password: 0, verified: 0, sessions: 0, __v: 0});

        res.json({
            success: true,
            user,
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;