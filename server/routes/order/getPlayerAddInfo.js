const router = require('express').Router();
const pagination = require('../../lib/pagination');
const PlayerAddPrice = require('../../models/playerAddPrice');



router.get('/active', async (req, res, next) => {
    try {
        const {userId, userType} = req.user;
        const {type} = req.params;


        // Data for pagination
        let totalCount;

        const {skip, limit} = pagination(req.query);

        let playerAddPrice;
        if(userType === 'admin' || userType === 'iep') {
            totalCount = await PlayerAddPrice.find({}).countDocuments();

            playerAddPrice = await PlayerAddPrice
                .find({}, {__v: 0})
                .sort({_id: -1})
                .skip(skip)
                .limit(limit)
                .populate('userId', '_id name image');
        }
        else if(userType === 'client' || userType === 'coach' || userType === 'gurdian') {
            totalCount = await PlayerAddPrice.find({userId}).countDocuments();

            playerAddPrice = await PlayerAddPrice
                .find({userId}, {__v: 0})
                .sort({_id: -1})
                .skip(skip)
                .limit(limit)
                .populate('userId', '_id name image');
        }
        
        res.json({
            message: `PlayerAddPrice for ${userType}`,
            playerAddPrice: {
                pageCount: Math.ceil(totalCount / limit),
                itemCount: totalCount,
                items: playerAddPrice
            }
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;