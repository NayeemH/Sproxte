const router = require('express').Router();
const FileData = require('../../models/fileData');
const {deleteImage} = require('../../lib/imageConverter');



router.delete('/:id', async (req, res, next) => {
    try {
        const {id}  = req.params;

        const prevData = await FileData.findOneAndDelete({_id: id});

        await Promise.all(
            prevData.files.map(file => deleteImage(file))
        );


        res.json({
            message: 'File data deleted'
        });
    }
    catch(error) {
        next(error)
    }
})

module.exports = router;