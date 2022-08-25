const router = require('express').Router();
const FileData = require('../../models/fileData');


router.get('/', async (req, res, next) => {
    try {
        const files = await FileData
            .find({}, {__v: 0})
            .populate('projectId', 'orderId');

        res.json({
            message: 'File data',
            data: {
                files
            }
        });
    }
    catch(error) {
        next(error)
    }
});

module.exports = router;