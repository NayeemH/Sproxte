const router = require('express').Router();
const FileData = require('../../models/fileData');
const {fileFetch, saveImage} = require('../../lib/imageConverter');


router.post('/', fileFetch.array('files', 100), async (req, res, next) => {
    try {
        const {projectId, productId} = req.body;
        
        if(!req.files) throw Error('File is required');
        
        const files = await Promise.all(
            req.files.map(file => saveImage(file))
        );


        const fileData = await new FileData({
            projectId, 
            productId,
            files
        }).save();

        res.json({
            message: 'File data',
            data: {
                files: fileData
            }
        });
    }
    catch(error) {
        next(error)
    }
})

module.exports = router;