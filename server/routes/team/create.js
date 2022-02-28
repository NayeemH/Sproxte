const router = require('express').Router();
const Team = require('../../models/team');
const {saveImage, fileFetch} = require('../../lib/imageConverter');



router.post('/', fileFetch.fields([{name: 'logo', maxCount: 1}, {name: 'sponsorLogo', maxCount: 1}]), async (req, res, next) => {
    try {
        const {name, school,  location, colorTheme, description, sponsorName} = req.body;
        const {userId} = req.user;
        const images = await Promise.all([
            saveImage(req.files.logo[0]),
            saveImage(req.files.sponsorLogo[0])
        ]);


        await new Team({
            name,
            coachId:userId,
            school,
            location,
            colorTheme,
            description,
            sponsorName,
            logo: images[0],
            sponsorLogo: images[1]
        }).save();

        res.json({
            msg: 'Team is added successfully',
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;