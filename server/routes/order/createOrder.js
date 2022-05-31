const router = require('express').Router();
const Order = require('../../models/order');
const {saveImage, fileFetch} = require('../../lib/imageConverter');


router.post('/', fileFetch.single('logo'), async (req, res, next) => {
    try {
        const {userId} = req.user;
        const {
            type,
            address, 
            phone, 
            email,
            firstName,
            lastName,
            serviceType,
            city,
            country,
            state,
            zip,
            teamName,
            location,
            color
        } = req.body;
        
        let image;

        if(req.file) {
            image = await saveImage(req.file);
        }

        const order = await new Order({
            type,
            userId,
            address, 
            phone, 
            email,
            firstName,
            lastName,
            serviceType,
            city,
            country,
            state,
            zip,
            teamName,
            location,
            color,
            logo: image
        }).save();


        res.json({
            message: 'Order is created',
            orderId: order._id
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;