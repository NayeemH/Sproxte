const router = require('express').Router();
const Team = require('../../models/team');
const {deleteImage} = require('../../lib/imageConverter');


router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        
        const team = await Team.findOneAndDelete({_id: id});

        res.json({
            success: true,
            msg: 'Team is deleted successfully',
        });

        if(team) {
            await Promise.all([
                deleteImage(type.logo),
                deleteImage(type.sponsorLogo)
            ]);
        }
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;