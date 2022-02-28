const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const {saveImage, fileFetch, deleteImage} = require('../../lib/imageConverter');
const createError = require('http-errors');


router.patch('/', fileFetch.single('image'), async (req, res, next) => {
    try {
        const {userId} = req.user;
        const {name, password, newPassword, address} = req.body;

        const updateInfo = {};
        
        // Check if name and address is given
        if(name) updateInfo.name = name;
        if(address) updateInfo.address = address;

        if(password && newPassword) {
            const user = await User.findOne({_id: userId});
            
            const valid = await bcrypt.compare(password, user.password);

            if(!valid) throw createError(422, 'Invalid Password');

            updateInfo.password = await bcrypt.hash(newPassword, 12);
        }

        if(req.file) {
            const images = await saveImage(req.file);
            updateInfo.image = images;
        }
        
        const user = await User.findOneAndUpdate({_id: userId}, {$set: updateInfo});

        res.json({
            success: true,
            msg: 'Profile is updated successfully',
        });

        if(user && req.file && user.image !== 'default.png') {
            await deleteImage(user.image);
        }
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;