const router = require('express').Router();
const ContactUs = require('../../models/contactUs');


router.post('/', async (req, res, next) => {
    try {
        const {name, email, message} = req.body;

        await new ContactUs({
            name, email, message
        }).save();

        res.json({
            message: 'Your message is recorded'
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;