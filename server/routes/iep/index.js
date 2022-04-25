const router = require('express').Router();
const Collection = require('../../models/collection');
const {ObjectId} =  require('mongoose').Types;


router.get('/:id', async (req, res, next) => {
    try {
        const {userType} = req.user;
        const {id} = req.params;


        let collections;
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
        }
        else {
            throw Error(`You are not authorized ${userType}`);
        }


        res.json({
            message: `IEP collection create info`,
            data: {
                collections
            }
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;