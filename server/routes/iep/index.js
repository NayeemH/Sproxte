const router = require('express').Router();
const Collection = require('../../models/collection');
const User = require('../../models/user');
const {ObjectId} =  require('mongoose').Types;


router.get('/:id', async (req, res, next) => {
    try {
        const {userType} = req.user;
        const {id} = req.params;


        let collections, user;
        if(userType === 'admin' || userType === 'iep') {
            collections = await Collection.aggregate([
                {
                    $match: {
                        isIEP: true,
                        userId: ObjectId(id)
                    }
                },
                {
                    $group: {
                        _id: {
                            month: {$month: '$createdAt'},
                            year: {$year: '$createdAt'}
                        },
                        count: {$sum: 1}
                    }
                },
                {
                    $project: {
                        _id: 0,
                        year: '$_id.year',
                        month: '$_id.month',
                        count: 1
                    }
                },
                {
                    $sort: {
                        year: 1,
                        month: 1
                    }
                }
            ]);

            user = await User.findOne({_id: id}, {password: 0, userType: 0, verified: 0, sessions: 0, orderHistory: 0, saveDesign: 0});
        }
        else {
            throw Error(`You are not authorized ${userType}`);
        }


        res.json({
            message: `IEP collection create info`,
            data: {
                collections,
                user
            }
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;