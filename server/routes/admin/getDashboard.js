const router = require('express').Router();
const Project = require('../../models/project');
const Collection = require('../../models/collection');


router.get('/', async (req, res, next) => {
    try {
        const collections = await Collection.find({}, {createdAt: 1});

        const projects = await Project.find({}, {createdAt: 1, price: 1});


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