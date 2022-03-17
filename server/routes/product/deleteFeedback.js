const router = require('express').Router();
const Collection = require('../../models/collection');



router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const {userId, userType} = req.user;


        if(userType === 'admin' || userType === 'iep') {
            await Collection.findOneAndUpdate({'feedbacks._id': id}, {$pull: {feedbacks: {_id: feedbackId}}});
        }
        else if(userType === 'client' || userType === 'coach') {
            const collection = await Collection.findOneAndUpdate({'feedbacks._id': id, userId}, {$pull: {feedbacks: {_id: feedbackId}}});

            if(!collection) throw Error('You can not delete feedback');
        }
        else {
            // TODO for gurdian
        }
        

        res.json({
            message: 'Feedback is deleted successfully',
        });
        
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;