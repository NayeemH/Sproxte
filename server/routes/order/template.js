const router = require('express').Router();
const TemplateOrder = require('../../models/templateOrder');



router.post('/', async (req, res, next) => {
    try {
        const {userId} = req.user;

        const {templateId, paymentToken, address, quantity} = req.body;

        // TODO: Check the payments


        await new TemplateOrder({
            userId,
            templateId, 
            paymentToken, 
            address, 
            quantity,
            price
        }).save();


        res.json({
            message: 'Template order is added successfully',
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;