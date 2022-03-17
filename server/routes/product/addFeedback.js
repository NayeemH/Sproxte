const router = require('express').Router();
const Collection = require('../../models/collection');



router.put('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const {userId, userType} = req.user;
        const {message, points} = req.body;

        const feedbacks = {
            user: userId,
            message,
            points
        };

        if(userType === 'admin' || userType === 'iep') {
            await Collection.findOneAndUpdate({_id: id}, {$push: {feedbacks}});
        }
        else if(userType === 'client' || userType === 'coach') {
            const collection = await Collection.findOneAndUpdate({_id: id, userId}, {$push: {feedbacks}});
            if(!collection) throw Error('You can not add Feedback');
        }
        else {
            // TODO for gurdian
        }
        

        res.json({
            message: 'Feedback is added successfully',
        });
        
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;