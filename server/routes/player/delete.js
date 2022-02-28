const router = require('express').Router();
const Player = require('../../models/player');
const {deleteImage} = require('../../lib/imageConverter');


router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        
        const player = await Player.findOneAndDelete({_id: id});

        res.json({
            success: true,
            msg: 'Player is deleted successfully',
        });

        if(player) {
            await Promise.all([
                deleteImage(type.image),
            ]);
        }
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;