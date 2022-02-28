const router = require('express').Router();
const Team = require('../../models/team');


router.get('/:teamId', async (req, res, next) => {
    try {
        const {teamId} = req.params;

        const team = await Team.findOne({_id: teamId}, {__v: 0});


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