const router = require('express').Router();
const Product = require('../../models/product');



router.get('/:id', async (req, res, next) => {
    try {
        const {userId, userType} = req.user;
        const {id} = req.params;


        let product;
        if(userType === 'admin' || userType === 'iep') {
            product = await Product.findOne(
                {_id: id}, 
                {__v: 0}
            );
        }
        else if(userType === 'client' || userType === 'coach') {
            product = await Product.findOne(
                {_id: id, userId}, 
                {__v: 0}
            );

            if(!product.length) throw Error('You are not authorized in this product or not exist');
        }
        else if(userType === 'guardian') {
            // TODO: fetch for guardian 
        }

        
        res.json({
            message: `Product for ${userType}`,
            product
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;