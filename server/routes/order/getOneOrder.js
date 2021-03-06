const router = require('express').Router();
const Order = require('../../models/order');
const Template = require('../../models/template');
const ProductType = require('../../models/productType');
const {ObjectId} = require('mongoose').Types;


router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        if(!(ObjectId.isValid(id) && new ObjectId(id).toString() == id)) return next();

        const order = await Order
            .findOne({_id: id}, {__v: 0})
            .populate('userId', '_id name image');

        const templateIds = order.orders.map(product => product.templateId);
        const productTypeIds = order.orders.map(product => product.productTypeId);

        const templateProducts = await Template.find({_id: {$in: templateIds}}, {name: 1, priceArray: 1, price: 1, discount: 1});
        const productTypeProducts = await ProductType.find({_id: {$in: productTypeIds}}, {name: 1, priceArray: 1, price: 1, discount: 1});

        order.orders = [
            ...templateProducts.map(product => {
               return {
                    count: order.orders.filter(order => order.templateId.toString() === product._id.toString())[0].count,
                    name: product.name,
                    priceArray: product.priceArray,
                    price: product.price,
                    discount: product.discount
            }}), 
            ...productTypeProducts.map(product => {
                return {
                     count: order.orders.filter(order => order.productTypeId.toString() === product._id.toString())[0].count,
                     name: product.name,
                     priceArray: product.priceArray,
                     price: product.price,
                     discount: product.discount
             }})
        ];


        res.json({
            message: `One order details`,
            order
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;