const router = require('express').Router();
const pagination = require('../../lib/pagination');
const Project = require('../../models/project');



router.get('/:type', async (req, res, next) => {
    try {
        const {userId, userType} = req.user;
        const {type} = req.params;

        let active;
        if(type === 'active') active = true;
        else if(type === 'completed') active = false;
        else return next();

        // Data for pagination
        let totalCount;

        const {skip, limit} = pagination(req.query);

        let projects;
        if(userType === 'admin' || userType === 'iep') {
            totalCount = await Project.find().countDocuments({active});

            projects = await Project
                .find({active}, {__v: 0, userId: 0, active: 0})
                .sort({_id: -1})
                .skip(skip)
                .limit(limit);
        }
        else if(userType === 'client' || userType === 'coach') {
            totalCount = await Project.find({active, userId}).countDocuments();

            projects = await Project
                .find({active, userId}, {__v: 0, userId: 0, active: 0})
                .sort({_id: -1})
                .skip(skip)
                .limit(limit);
        }
        else if(userType === 'guardian') {
            // TODO: fetch for guardian 
        }

        
        res.json({
            message: `${type} project for ${userType}`,
            projects: {
                pageCount: Math.ceil(totalCount / limit),
                itemCount: totalCount,
                items: projects
            }
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;