const router = require('express').Router();
const Player = require('../../models/player');
const {saveImage, fileFetch} = require('../../lib/imageConverter');



router.post('/:teamId', fileFetch.single('image'), async (req, res, next) => {
    try {
        const {name, gurdianEmail} = req.body;
        const {userId} = req.user;
        const {teamId} = req.params;

        const images = await Promise.all([
            saveImage(req.files.image[0]),
        ]);


        await new Player({
            name,
            coachId:userId,
            teamId,
            gurdianEmail,
            image: images[0]
        }).save();

        // TODO: send gurdian login email

        res.json({
            msg: 'Player is added successfully',
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;