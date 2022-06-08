const router = require('express').Router();
const Project = require('../../models/project');


router.get('/', async (req, res, next) => {
    try {
        const projects = await Project.find({status: {$in: ['completed', 'delivered']}}, {_id: 1, logo: 1, teamName: 1})


        res.json({
            message: 'Team data',
            data: projects
        });
    }
    catch(error) {
        next(error);
    }
});



module.exports = router;