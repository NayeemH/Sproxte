const router = require('express').Router();
const pagination = require('../../lib/pagination');
const Project = require('../../models/project');
const Product = require('../../models/product');



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
        let totalCount, finalProjects;

        const {skip, limit} = pagination(req.query);

        let projects;
        if(userType === 'admin' || userType === 'iep') {
            // Setup filder
            const filder = {
                active,
                type: 'normal'
            };
            if(status) filder.status = status;

            totalCount = await Project.find(filder).countDocuments();

            projects = await Project
                .find(filder, {__v: 0, userId: 0, active: 0})
                .sort({_id: -1})
                .skip(skip)
                .limit(limit);

            const projectIds = projects.find(({_id}) => _id);

            const products = await Product.find({projectId: {$in: projectIds}}, {_id: 1, name: 1, projectId: 1, status: 1});

            finalProjects = projects.map(project => {
                return {
                    ...project,
                    products: products.filter(product => product.projectId.toString() === project._id.toString())
                }
            });
        }
        else if(userType === 'client' || userType === 'coach' || userType === 'guardian') {
             // Setup filder
             const filder = {
                active,
                type: 'normal',
                $or: [{userId}, {gurdianIds: userId}]
            };
            if(status) filder.status = status;

            totalCount = await Project.find(filder).countDocuments();

            projects = await Project
                .find(filder, {__v: 0, userId: 0, active: 0})
                .sort({_id: -1})
                .skip(skip)
                .limit(limit);

            const projectIds = projects.find(({_id}) => _id);

            const products = await Product.find({projectId: {$in: projectIds}}, {_id: 1, name: 1, projectId: 1, status: 1});

            finalProjects = projects.map(project => {
                return {
                    ...project,
                    products: products.filter(product => product.projectId.toString() === project._id.toString())
                }
            });
        }

        
        res.json({
            message: `${type} project for ${userType}`,
            projects: {
                pageCount: Math.ceil(totalCount / limit),
                itemCount: totalCount,
                items: finalProjects
            }
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;