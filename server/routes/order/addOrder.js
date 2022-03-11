const router = require('express').Router();
const Template = require('../../models/template');
const ProductType = require('../../models/productType');
const Order = require('../../models/order');
const {saveImage, fileFetch} = require('../../lib/imageConverter');


router.put('/:id', fileFetch.fields([{name: 'frontImages', maxCount: 10}, {name: 'backImages', maxCount: 10}]), async (req, res, next) => {
    try {
        const {type} = req.body;

        if(type === 'template') {
            await addTemplate(req);
        }
        else if(type === 'custom') {
            await addCustomTemplate(req);
        }
        else {
            return res.status(400).json({
                message: "Invalid order type"
            });
        }

        res.json({
            message: 'Template order is added successfully',
        });
    }
    catch(err) {
        next(err);
    }
});




const addTemplate = async (req) => {
    const {userId} = req.user;
    const {id} =req.params;
    const {templateId, count, size, color} = req.body;

    if(count < 0) count = - count;

    const template = await Template.findOne({_id: templateId}, {price: 1, discount: 1});

    if(!template) throw Error("Template not found");

    const { price, discount } = template;

    const netPrice = Math.round(price * parseInt(count) * (1 - discount / 100));

    await Order.findOneAndUpdate(
        {_id: id, userId}, 
        {
            $push: {orders: {templateId, count: parseInt(count), size, color}},
            $inc: {price: netPrice}
        }
    );
}


const addCustomTemplate = async (req) => {
    const {userId} = req.user;
    const {id} =req.params;
    const {
        productTypeId, 
        count, 
        size, 
        color, 
        description, 
        layoutId, 
        primaryText, 
        primaryColor, 
        secondaryText, 
        secondaryColor
    } = req.body;

    let frontImages, backImages;
    if(req.files && req.files.frontImages) {
        frontImages = await Promise.all(
            req.files.frontImages.map(image => saveImage(image))
        );
    }

    if(req.files && req.files.backImages) {
        backImages = await Promise.all(
            req.files.backImages.map(image => saveImage(image))
        );
    }

    if(count < 0) count = - count;

    const { price } = await ProductType.findOne({_id: productTypeId}, {price: 1, discount: 1});

    const netPrice = price * count * (1 - discount / 100);

    await Order.findOneAndUpdate(
        {_id: id, userId}, 
        {
            $push: {orders: {
                productTypeId, 
                count, 
                size, 
                color, 
                description, 
                layoutId, 
                primaryText, 
                primaryColor, 
                secondaryText, 
                secondaryColor,
                frontImages, 
                backImages
            },
            $inc: {price: netPrice}
        }}
    );
}



module.exports = router;