const router = require('express').Router();
const Product = require('../../models/product');



router.get('/:id', async (req, res, next) => {
    try {
        const {userId, userType} = req.user;
        const {id} = req.params;


        let products;
        if(userType === 'admin' || userType === 'iep') {
            products = await Product.find(
                {projectId: id}, 
                {_id: 1, name: 1, type: 1, image: 1, colorImage: 1, count: 1, price: 1, discount: 1, status: 1}
            );
        }
        else if(userType === 'client' || userType === 'coach') {
            products = await Product.find(
                {projectId: id, userId}, 
                {_id: 1, name: 1, type: 1, image: 1, colorImage: 1, count: 1, price: 1, discount: 1, status: 1}
            );

            if(!products.length) throw Error('You are not authorized in this product or not exist');
        }
        else if(userType === 'guardian') {
            // TODO: fetch for guardian 
        }

        
        res.json({
            message: `Product for ${userType}`,
            products
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;