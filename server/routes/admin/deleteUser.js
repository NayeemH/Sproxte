const router = require('express').Router();
const User = require('../../models/user');


router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        await User.findOneAndDelete({_id: id});

        res.json({
            message: `User deleted`
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;