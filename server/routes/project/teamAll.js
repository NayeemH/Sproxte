const router = require('express').Router();
const pagination = require('../../lib/pagination');
const Project = require('../../models/project');



router.get('/:type', async (req, res, next) => {
    try {
        const {userId, userType} = req.user;
        const {type} = req.params;
        const {status} = req.query;

        let active;
        if(type === 'active') active = true;
        else if(type === 'completed') active = false;
        else return next();

        

        // Data for pagination
        let totalCount;

        const {skip, limit} = pagination(req.query);

        let projects;
        if(userType === 'admin' || userType === 'iep') {
            // Setup filder
            const filder = {
                active,
                type: 'team'
            };
            if(status) filder.status = status;

            totalCount = await Project.find(filder).countDocuments();

            projects = await Project
                .find(filder, {__v: 0, userId: 0, active: 0})
                .sort({_id: -1})
                .skip(skip)
                .limit(limit);
        }
        else if(userType === 'client' || userType === 'coach' || userType === 'guardian') {
             // Setup filder
             const filder = {
                active,
                type: 'team',
                $or: [{userId}, {gurdianIds: userId}]
            };
            if(status) filder.status = status;

            totalCount = await Project.find(filder).countDocuments();

            projects = await Project
                .find(filder, {__v: 0, userId: 0, active: 0})
                .sort({_id: -1})
                .skip(skip)
                .limit(limit);
        }

        
        res.json({
            message: `${type} team project for ${userType}`,
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