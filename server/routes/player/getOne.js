const router = require('express').Router();
const Player = require('../../models/player');


router.get('/:playerId', async (req, res, next) => {
    try {
        const {playerId} = req.params;

        const player = await Player.findOne({_id: playerId}, {__v: 0});


        res.json({
            success: true,
            types: player,
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;