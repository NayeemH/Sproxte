const router = require('express').Router();
const Product = require('../../models/product');
const Project = require('../../models/project');

// Stripe object
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/:id', async (req, res, next) => {
    try {
        const {userId} = req.user;
        const {id} = req.params;
        const {count} = req.body;

        const project = await Project.findOne({_id: id});

        if(!project) throw Error('project not found');

        const product = await Product.findOne({projectId: project._id});


        let i;
        for(i = 0; i < product.discount.range.length; i++) 
            if(count <= product.discount.range[i]) 
                break;

        const calDiscount = product.discount.discount[i];

        const netPrice = Math.round(product.price * (1 - calDiscount / 100));

        const price = (project.playerAddPrice + netPrice) * count;
        
        if(price < 0.5) throw Error('No need to payment');

        const clientSecret = await stripe.paymentIntents.create({
            amount: Math.round(price * 100),
            currency: 'usd',
            payment_method_types: ['card'],
            metadata: {
                type: 'newPlayerAdd',
                userId,
                projectId: project._id.toString(),
                price,
                count
            }
        });

        res.json({
            message: 'Payment Token is created',
            clientSecret: clientSecret.client_secret
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;