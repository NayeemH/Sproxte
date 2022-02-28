const router = require('express').Router();
const Team = require('../../models/team');


router.get('/:teamId', async (req, res, next) => {
    const {userId} = req.user;
    const {teamId} = req.params;
    try {
        const team = await Team.find({coachId: userId, teamId}, {__v: 0});


        res.json({
            success: true,
            types: team,
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;