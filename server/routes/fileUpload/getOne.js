const router = require('express').Router();
const FileData = require('../../models/fileData');


router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const file = await FileData.findOne({$or: [{_id: id}, {projectId: id}, {productId: id}]}, {__v: 0});

        res.json({
            message: 'File data',
            data: {
                file
            }
        });
    }
    catch(error) {
        next(error)
    }
})

module.exports = router;