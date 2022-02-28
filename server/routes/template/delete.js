const router = require('express').Router();
const Template = require('../../models/template');
const {deleteImage} = require('../../lib/imageConverter');


router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        
        const template = await Template.findOneAndDelete({_id: id});

        res.json({
            success: true,
            msg: 'Product Type is deleted successfully',
        });

        if(template) {
            await Promise.all([
                ...template.layouts.map(layout => deleteImage(layout)),
                deleteImage(template.pngImageFront),
                deleteImage(template.pngImageBack)
            ]);
        }
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;