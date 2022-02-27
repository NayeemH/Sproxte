const router = require('express').Router();
const CategoryType = require('../../models/categoryType');


router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const categoryType = await CategoryType.findOne({_id: id}, {__v: 0});


        res.json({
            success: true,
            types: categoryType,
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;