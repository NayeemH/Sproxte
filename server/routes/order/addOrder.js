const router = require('express').Router();
const Template = require('../../models/template');
const ProductType = require('../../models/productType');
const Product = require('../../models/product');
const Order = require('../../models/order');
const {saveImage, fileFetch} = require('../../lib/imageConverter');


router.put('/:id', fileFetch.fields([{name: 'frontImages', maxCount: 10}, {name: 'backImages', maxCount: 10}, {name: 'fontImage', maxCount: 1}]), async (req, res, next) => {
    try {
        const {type} = req.body;

        if(type === 'template') {
            await addTemplate(req);
        }
        else if(type === 'custom') {
            await addCustomTemplate(req);
        }
        else if(type === 'team') {
            // This is same for team same as custom order
            await addCustomTemplate(req)
        }
        else if(type === 'link') {
            // This is same for team same as custom order
            await addLinkTemplate(req)
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
    const {type, templateId, count: stringCount, size, color, color2} = req.body;

    const count = parseInt(stringCount);
    if(count < 0) count = - count;

    const template = await Template.findOne({_id: templateId}, {price: 1, priceArray: 1, discount: 1, weight: 1});

    if(!template) throw Error("Template not found");

    const { price, discount, priceArray, weight } = template;

    // Calculate price
    let i;
    for(i = 0; i < priceArray.range.length; i++) 
        if(count <= priceArray.range[i]) 
            break;

    const calPriceArray = priceArray.price[i];

    // Calculate discount
    for(i = 0; i < discount.range.length; i++) 
        if(count <= discount.range[i]) 
            break;

    const calDiscount = discount.discount[i];


    const netPrice = calPriceArray * count * (1 - calDiscount / 100);

    await Order.findOneAndUpdate(
        {_id: id, userId}, 
        {
            $push: {orders: {type, templateId, count: count, size, color, color2, weight}},
            $inc: {price: netPrice, weight: count * weight}
        }
    );
}


const addCustomTemplate = async (req) => {
    const {userId} = req.user;
    const {id} =req.params;
    const {
        type,
        productTypeId, 
        count: stringCount, 
        size, 
        color, 
        color2,
        description, 
        layoutId, 
        primaryText, 
        primaryColor, 
        secondaryText, 
        secondaryColor,
        font,
        orderColor,
        productFont
    } = req.body;
    
    let frontImages, backImages, fontImage;
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

    if(req.files && req.files.fontImage) {
        fontImage = await saveImage(req.files.fontImage[0]);
    }

    const count = parseInt(stringCount);
    if(count < 0) count = - count;

    const productType = await ProductType.findOne({_id: productTypeId}, {price: 1, discount: 1, priceArray: 1, weight: 1, playerAddPrice: 1});

    if(!productType) throw Error('Product Type not found');
    
    const { price, discount, priceArray, weight, playerAddPrice } = productType;

    // Calculate price
    let i;
    for(i = 0; i < priceArray.range.length; i++) 
        if(count <= priceArray.range[i]) 
            break;

    const calPriceArray = priceArray.price[i];

    // Calculate discount
    for(i = 0; i < discount.range.length; i++) 
        if(count <= discount.range[i]) 
            break;

    const calDiscount = discount.discount[i];

    const netPrice = calPriceArray * count * (1 - calDiscount / 100);

    await Order.findOneAndUpdate(
        {_id: id, userId}, 
        {
            $push: {orders: {
                type,
                productTypeId, 
                count, 
                size, 
                color, 
                color2,
                weight,
                description, 
                layoutId, 
                primaryText, 
                primaryColor, 
                secondaryText, 
                secondaryColor,
                frontImages, 
                backImages,
                font,
                orderColor,
                productFont,
                fontImage
            }},
            $inc: {playerAddPrice, price: netPrice, weight: count * weight}
        }
    );
}


const addLinkTemplate = async (req) => {
    const {userId} = req.user;
    const {id} =req.params;
    const {type, productId, count: stringCount, size, color, color2} = req.body;

    const count = parseInt(stringCount);
    if(count < 0) count = - count;

    const product = await Product.findOne({_id: productId}, {price: 1, priceArray: 1, discount: 1, weight: 1});

    if(!product) throw Error("Product not found");

    const { price, discount, priceArray, weight } = product;

    // Calculate price
    let i;
    for(i = 0; i < priceArray.range.length; i++) 
        if(count <= priceArray.range[i]) 
            break;

    const calPriceArray = priceArray.price[i];

    // Calculate discount
    for(i = 0; i < discount.range.length; i++) 
        if(count <= discount.range[i]) 
            break;

    const calDiscount = discount.discount[i];


    const netPrice = calPriceArray * count * (1 - calDiscount / 100);

    await Order.findOneAndUpdate(
        {_id: id, userId}, 
        {
            $push: {orders: {type, productId, count: count, size, color, color2, weight}},
            $inc: {price: netPrice, weight: count * weight}
        }
    );
}

module.exports = router;