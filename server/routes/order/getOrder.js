const router = require('express').Router();
const ProductTypeOrder = require('../../models/productTypeOrder');
const TemplateOrder = require('../../models/templateOrder');


router.get('/', async (req, res, next) => {
    try {
        const {userId} = req.user;

        const templateOrders = await TemplateOrder
            .find({userId}, {paymentToken: 0})
            .sort({_id: -1});

        const productTypeOrders = await ProductTypeOrder
            .find({userId}, {paymentToken: 0, IEPTemplateId: 0})
            .sort({_id: -1});


        res.json({
            message: 'Orders',
            orders: {
                templateOrders,
                productTypeOrders
            }
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;