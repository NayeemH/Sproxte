const router = require('express').Router();
const CategoryType = require('../../models/categoryType');


router.get('/', async (req, res, next) => {
    try {
        const categoryType = await CategoryType.find({}, {__v: 0});


        res.json({
            message: 'Category types all data',
            types: categoryType,
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;