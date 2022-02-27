const router = require('express').Router();
const CategoryType = require('../../models/categoryType');



router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        
        await CategoryType.findOneAndDelete({_id: id});

        res.json({
            message: 'Product Type is deleted successfully',
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;