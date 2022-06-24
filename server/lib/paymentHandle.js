const imageMerge = require('./imageMerge');
const sendNotification = require('./sendNotification');
const path = require('path');
const fs = require('fs/promises');

const Order = require('../models/order');
const Project = require('../models/project');
const Product = require('../models/product');
const Template = require('../models/template');
const ProductType = require('../models/productType');
const Collection = require('../models/collection');
const User = require('../models/user');
const PlayerAddPrice = require('../models/playerAddPrice');


const addPlayerHandle = async (object) => {
    const {
        userId, 
        projectId, 
        price,
        count
    } = object.metadata;

    const project = await Project.findOneAndUpdate(
        {_id: projectId},
        {$inc: {count, price}}
    );

    const order = await Order.findOneAndUpdate(
        {_id: project.orderId},
        {
            $inc: {price}
        }
    );

    await new PlayerAddPrice({
        userId,
        projectId, 
        price,
        count,
        teamName: order.teamName,
        location: order.location
    }).save();

    // Send notification
    const users = await User.find({$or: [{userType: 'admin'}, {userType: 'iep'}]}, {_id: 1});
    const userIds = users.map(({_id}) => _id.toString());

    userIds.push(userId);

    await sendNotification('Player count is increased', userIds, project._id);

}


// Handle payment
const paymentHandle = async (object) => {
    const {userId, orderId} = object.metadata;

    // Find the order
    const order = await Order.findOne({_id: orderId});

    // Filter template
    const templateOrders = order.orders.filter(order => order.type === 'template');

    // Filter custom
    const customOrders = order.orders.filter(order => order.type === 'custom');

    // Filter teams
    const teamOrders = order.orders.filter(order => order.type === 'team');

    // Filter links
    const linkOrders = order.orders.filter(order => order.type === 'link');

    // Get data of the templates
    const templates = await Promise.all(
        templateOrders.map(order => Template.findOneAndUpdate({_id: order.templateId}, {$inc: {sellCount: 1}}))
    );

    // Get data of the customs
    const customs = await Promise.all(
        customOrders.map(order => ProductType.findOneAndUpdate({_id: order.productTypeId}, {$inc: {sellCount: 1}}))
    );

    // Get data of the teams
    const teams = await Promise.all(
        teamOrders.map(order => ProductType.findOneAndUpdate({_id: order.productTypeId}, {$inc: {sellCount: 1}}))
    );

    // Get data of the links
    const links = await Promise.all(
        linkOrders.map(order => Product.findOneAndUpdate({_id: order.productId}, {$inc: {sellCount: 1}}))
    );


    // Get project name and image
    let projectName, projectImage, type, count, sizes, playerAddPrice, singleProductPrice, productCount;
    if(templateOrders.length) {
        projectName = templates[0].name;
        projectImage = templates[0].pngImageFront;
        count = parseInt(templateOrders[0].count);
    }
    else if(linkOrders.length) {
        projectName = links[0].name;
        projectImage = links[0].image.front;
        count = parseInt(linkOrders[0].count);
    }
    else if(customOrders.length) {
        projectName = customs[0].name;
        projectImage = customs[0].pngImageFront;
        count = parseInt(customOrders[0].count);
    }
    else if(teamOrders.length) {
        projectName = teams[0].name;
        projectImage = teams[0].pngImageFront;
        type = 'team';
        sizes = teams[0].sizes;
        count = parseInt(teamOrders[0].count) - 1;
        playerAddPrice = order.playerAddPrice;
        singleProductPrice = order.price / (count + 1);
        productCount = teamOrders.length
    }

    // Create the project
    const project = await new Project({
        userId,
        orderId,
        name: projectName,
        image: projectImage,
        price: order.price,
        type,
        count,
        sizes,
        logo: order.logo,
        teamName: order.teamName,
        location: order.location,
        color: order.color,
        playerAddPrice,
        singleProductPrice,
        productCount
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
            priceArray: templates[i].priceArray,
            discount: templates[i].discount,
            color2: order.color2,
            count: order.count,
            size: order.size,
            weight: order.weight
        }).save()),
        ...linkOrders.map((order, i) => new Product({
            userId,
            projectId: project._id,
            typeId: order.productId,
            type: order.type,
            name: links[i].name,
            image: links[i].image,
            price: links[i].price,
            priceArray: links[i].priceArray,
            discount: links[i].discount,
            color2: order.color2,
            count: order.count,
            size: order.size,
            weight: order.weight
        }).save()),
        ...customOrders.map((order, i) => new Product({
            userId,
            projectId: project._id,
            typeId: order.productTypeId,
            type: order.type,
            name: customs[i].name,
            image: {
                front: customs[i].pngImageFront,
                back: customs[i].pngImageBack,
            },
            colorImage: order.color && customs[i].imageData.filter(({color}) => color === order.color)[0].image,
            color2: order.color2,
            price: customs[i].price,
            priceArray: customs[i].priceArray,
            discount: customs[i].discount,
            count: order.count,
            size: order.size,
            weight: order.weight,
            description: order.description,
            layoutImage: order.layoutId && customs[i].layouts.filter(({_id}) => _id.toString() === order.layoutId.toString())[0].image,
            primaryText: order.primaryText,
            primaryColor: order.primaryColor,
            secondaryText: order.secondaryText,
            secondaryColor: order.secondaryColor,
            frontImages: order.frontImages,
            backImages: order.backImages,
            font: order.font,
            orderColor: order.orderColor,
            productFont: order.productFont,
            fontImage: order.fontImage
        }).save()),
        ...teamOrders.map((order, i) => new Product({
            userId,
            projectId: project._id,
            typeId: order.productTypeId,
            type: order.type,
            name: teams[i].name,
            image: {
                front: teams[i].pngImageFront,
                back: teams[i].pngImageBack,
            },
            colorImage: order.color && teams[i].imageData.filter(({color}) => color === order.color)[0].image,
            color2: order.color2,
            price: teams[i].price,
            priceArray: teams[i].priceArray,
            discount: teams[i].discount,
            count: order.count,
            size: order.size,
            weight: order.weight,
            description: order.description,
            layoutImage: order.layoutId && teams[i].layouts.filter(({_id}) => _id.toString() === order.layoutId.toString())[0].image,
            primaryText: order.primaryText,
            primaryColor: order.primaryColor,
            secondaryText: order.secondaryText,
            secondaryColor: order.secondaryColor,
            frontImages: order.frontImages,
            backImages: order.backImages,
            font: order.font,
            orderColor: order.orderColor,
            productFont: order.productFont,
            fontImage: order.fontImage
        }).save())
    ]);

    // Create Collections

    await Promise.all(
        products.map(async product => {
            if(product.type === 'template' || product.type === 'link') return;

            const buffers = await Promise.all([
                fs.readFile(path.resolve(`data/image/small/${product.colorImage}`)),
                fs.readFile(path.resolve(`data/image/small/${product.frontImages[0]}`))
            ]);

            const mergeImage = await imageMerge(buffers[1], buffers[0]); // This is changed

            return new Collection({
                userId: product.userId,
                productId: product._id,
                title: product.name,
                image: mergeImage
            }).save();
        })
    );

    // Put project id to order
    await Order.findOneAndUpdate({_id: orderId}, {$set: { projectId: project._id, paymentStatus: 'paid', deleveryStatus: 'accepted'}});

    // Send notification
    const users = await User.find({$or: [{userType: 'admin'}, {userType: 'iep'}]}, {_id: 1});
    const userIds = users.map(({_id}) => _id.toString());

    userIds.push(userId);

    await sendNotification('New project is added', userIds, project._id);
}



module.exports = {addPlayerHandle, paymentHandle}