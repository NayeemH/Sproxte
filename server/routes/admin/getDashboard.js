const router = require('express').Router();
const Project = require('../../models/project');
const Collection = require('../../models/collection');


router.get('/', async (req, res, next) => {
    try {
        const collections = await Collection.aggregate([
            {
                $match: {
                    isIEP: true
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
        

        const projects = await Project.find({}, {createdAt: 1, price: 1, status: 1, _id: 0});


        res.json({
            message: `Admin dashboard`,
            data: {
                collections,
                projects
            }
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;