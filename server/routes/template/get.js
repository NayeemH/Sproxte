const router = require('express').Router();
const Template = require('../../models/template');


router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const template = await Template.findOne({_id: id}, {__v: 0});


        res.json({
            success: true,
            types: template,
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;