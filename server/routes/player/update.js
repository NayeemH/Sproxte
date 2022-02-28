const router = require('express').Router();
const {saveImage, fileFetch, deleteImage} = require('../../lib/imageConverter');
const Team = require('../../models/team');



router.patch('/:id', fileFetch.fields([{name: 'logo', maxCount: 1}, {name: 'sponsorLogo', maxCount: 1}]), async (req, res, next) => {
    try {
        const {name, school,  location, colorTheme, description, sponsorName} = req.body;
        const {id} = req.params;

        const updatedItems = {
            name: name === null ? undefined : name,
            school: school === null ? undefined : school,
            location: location === null ? undefined : location,
            colorTheme: colorTheme === null ? undefined : colorTheme,
            description: description === null ? undefined : description,
            sponsorName: sponsorName === null ? undefined : sponsorName,

        };

        
        if(req.files && req.files.logo) {
            const images = await saveImage(req.files.logo[0]);
            updatedItems.logo = images;
        }

        if(req.files && req.files.sponsorLogo) {
            const images = await saveImage(req.files.sponsorLogo[0]);
            updatedItems.sponsorLogo = images;
        }

        const team = await Team.findOneAndUpdate({_id: id}, {$set: updatedItems});

        res.json({
            success: true,
            message: 'Team is updated successfully',
        });

        // delete previous images
        if(team) {
            if(req.files && req.files.logo) {
                await deleteImage(team.logo);
            }
    
            if(req.files && req.files.sponsorLogo) {
                await deleteImage(team.sponsorLogo);
            }
        }
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;