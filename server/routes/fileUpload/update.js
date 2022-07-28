const router = require('express').Router();
const FileData = require('../../models/fileData');
const {fileFetch, saveImage, deleteImage} = require('../../lib/imageConverter');


router.patch('/:id', fileFetch.array('files', 100), async (req, res, next) => {
    try {
        const {id} = req.params;
        const {projectId, productId} = req.body;
        
        let updateData;
        if(productId) updateData.productId = productId;
        if(projectId) updateData.projectId = projectId;

        if(req.files) {
            updateData.files = await Promise.all(
                req.files.map(file => saveImage(file))
            );
        }

        const prevData = await FileData.findOneAndUpdate({_id: id}, {$set: updateData});

        await Promise.all(
            prevData.files.map(file => deleteImage(file))
        );

        res.json({
            message: 'File data updated'
        });
    }
    catch(error) {
        next(error)
    }
})

module.exports = router;