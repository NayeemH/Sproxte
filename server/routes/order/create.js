const router = require('express').Router();
const Order = require('../../models/order');

router.post('/', async(req,res,next)=>{
    try{
        const {products, price,address} = req.body;
        const {userId} = req.user;

        const order = await new Order({
          products,
          price,
          address,  
          userId
        }).save();

        res.json({
            sucess: true,
            msg: 'Order placess successfully'
        });
    }
    catch (err){
        next(err);
    }
})