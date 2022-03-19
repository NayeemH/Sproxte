const router = require('express').Router();
const stripe = require('stripe');
const imageMerge = require('../../lib/imageMerge');
const sendNotification = require('../../lib/sendNotification');
const path = require('path');
const fs = require('fs/promises');

const Order = require('../../models/order');
const Project = require('../../models/project');
const Product = require('../../models/product');
const Template = require('../../models/template');
const ProductType = require('../../models/productType');
const Collection = require('../../models/collection');
const User = require('../../models/user');



const {STRIPE_WEBHOOK_SECRET} = process.env;

router.post('/', async (req, res, next) => {
    try {
        const signature = req.headers['stripe-signature'];

        // Checking the signature
        const {type: eventType, data} = stripe.webhooks.constructEvent(
            req.rawBody,
            signature,
            STRIPE_WEBHOOK_SECRET
        );

        // Create project and product if payment is successfull
        if(eventType === 'payment_intent.succeeded') {
            
            await paymentHandle(data.object);

        }
        else {
            console.log(`Unhandled event type ${eventType}`);
        }

        res.sendStatus(200);
    }
    catch(err) {
        console.log(err);
        next(err);
    }
});


// Handle payment
const paymentHandle = async (object) => {
    const {userId, orderId} = object.metadata;

    // Find the order
    const order = await Order.findOne({_id: orderId, userId});

    // Filter template
    const templateOrders = order.orders.filter(order => order.type === 'template');

    // Filter custom
    const customOrders = order.orders.filter(order => order.type === 'custom');

    // Filter teams


    // Get data of the templates
    const templates = await Promise.all(
        templateOrders.map(order => Template.findOne({_id: order.templateId}))
    );

    // Get data of the customs
    const customs = await Promise.all(
        customOrders.map(order => ProductType.findOne({_id: order.productTypeId}))
    );


    // Get project name and image
    let projectName, projectImage;
    if(templateOrders.length) {
        projectName = templates[0].name;
        projectImage = templates[0].pngImageFront;
    }
    else if(customOrders.length) {
        projectName = customs[0].name;
        projectImage = customs[0].pngImageFront;
    }

    // Create the project
    const project = await new Project({
        userId,
        orderId,
        name: projectName,
        image: projectImage,
        price: order.price
    }).save();


    const products = await Promise.all([
        ...templateOrders.map((order, i) => new Product({
            userId,
            projectId: project._id,
            typeId: order.templateId,
            type: order.type,
            name: templates[i].name,
            image: {
                front: templates[i].pngImageFront,
                back: templates[i].pngImageBack,
            },
            price: templates[i].price,
            discount: templates[i].discount,
            count: order.count,
            size: order.size
        }).save()),
        ...customOrders.map((order, i) => new Product({
            userId,
            projectId: project._id,
            typeId: order.templateId,
            type: order.type,
            name: customs[i].name,
            image: {
                front: customs[i].pngImageFront,
                back: customs[i].pngImageBack,
            },
            colorImage: order.color && customs[i].imageData.filter(({color}) => color === order.color)[0].image,
            price: customs[i].price,
            discount: customs[i].discount,
            count: order.count,
            size: order.size,
            description: order.description,
            layoutImage: order.layoutId && customs[i].layouts.filter(({_id}) => _id.toString() === order.layoutId.toString())[0].image,
            primaryText: order.primaryText,
            primaryColor: order.primaryColor,
            secondaryText: order.secondaryText,
            secondaryColor: order.secondaryColor,
            frontImages: order.frontImages,
            backImages: order.backImages
        }).save()),
    ]);

    // Create Collections

    await Promise.all(
        products.map(async product => {
            if(product.type === 'template') return;

            const buffers = await Promise.all([
                fs.readFile(path.resolve(`data/image/small/${product.colorImage}`)),
                fs.readFile(path.resolve(`data/image/small/${product.frontImages[0]}`))
            ]);

            const mergeImage = await imageMerge(buffers[0], buffers[1]);

            return new Collection({
                userId: product.userId,
                productId: product._id,
                title: product.name,
                image: mergeImage
            }).save();
        })
    );

    // Put project id to order
    await Order.findOneAndUpdate({_id: orderId}, {$set: {projectId: project._id, paymentStatus: 'paid', deleveryStatus: 'accepted'}});

    // Send notification
    const users = await User.find({$or: [{userType: 'admin'}, {userType: 'iep'}]}, {_id: 1});
    const userIds = users.map(({_id}) => _id.toString());

    userIds.push(userId);

    await sendNotification('New project is added', userIds, project._id);
}


module.exports = router;