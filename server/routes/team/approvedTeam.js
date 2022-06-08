const router = require('express').Router();
const Project = require('../../models/project');
const Product = require('../../models/product');


router.get('/:projectId', async (req, res, next) => {
    try {
        const {projectId} = req.params;

        const project = await Project.findOne({_id: projectId}, {_id: 1, logo: 1, teamName: 1});

        if(!project) throw Error('Project not found');
        
        const products = await Product.find({projectId});

        const projectData = project.toJSON();

        projectData.products = products;


        res.json({
            message: 'Approved Team',
            data: projectData
        });
    }
    catch(error) {
        next(error);
    }
});



module.exports = router;