const router = require('express').Router();
const Product = require('../../models/product');



router.patch('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const {userId, userType} = req.user;


        if(userType === 'admin') {
            await Product.findOneAndUpdate({_id: id}, {$set: {status: 'approved'}});
        }
        else if(userType === 'client' || userType === 'coach') {
            const product = await Product.findOneAndUpdate({_id: id, userId}, {$set: {status: 'approved'}});

            if(!product) throw Error('You can not approved product');
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