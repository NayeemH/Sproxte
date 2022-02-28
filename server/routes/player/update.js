const router = require('express').Router();
const {saveImage, fileFetch, deleteImage} = require('../../lib/imageConverter');
const Player = require('../../models/player');



router.patch('/:id', fileFetch.single('image'), async (req, res, next) => {
    try {
        const {name, gurdianEmail} = req.body;
        const {id} = req.params;

        const updatedItems = {
            name: name === null ? undefined : name,
            gurdianEmail: gurdianEmail === null ? undefined : gurdianEmail,

        };

        
        if(req.files && req.files.image) {
            const image = await saveImage(req.files.image[0]);
            updatedItems.image = images;
        }

        const player = await Player.findOneAndUpdate({_id: id}, {$set: updatedItems});

        // TODO: send invitation email to gurdian
        if(gurdianEmail){
            
        }

        res.json({
            success: true,
            message: 'Player is updated successfully',
        });

        // delete previous images
        if(player) {
            if(req.files && req.files.image) {
                await deleteImage(player.image);
            }
    
        }
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;