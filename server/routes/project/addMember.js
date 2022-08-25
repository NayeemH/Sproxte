const router = require('express').Router();
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const Project = require('../../models/project');
const Product = require('../../models/product');
const User = require('../../models/user');
const Collection = require('../../models/collection');
const sendNotification = require('../../lib/sendNotification');
const {saveImage, fileFetch} = require('../../lib/imageConverter');
const sendMail = require('../../lib/sendMail');
const Order = require('../../models/order');
const ProductType = require('../../models/productType');
const fs = require('fs/promises');
const path = require('path');
const imageMerge = require('../../lib/imageMerge');

router.post('/:id', fileFetch.single('image'), async (req, res, next) => {
    try {
        const {userId, userType} = req.user;
        const {id} = req.params;
        const {
            name,
            email,
            size
        } = req.body;


        if(userType === 'admin' || userType === 'coach') {
            const project = await Project.findOne({_id: id, type: 'team'});

            if(!project) throw Error('Project not found');

            const products = await Product
                .find({projectId: id})
                .limit(project.productCount);

            if(project.count  < 1) throw Error('Can not add user');
            
            // Find the email 
            let user = await User.findOne({email});

            // Throw error if email already registers
            if(!user) {
                const password = crypto.randomBytes(4).toString('hex');

                // Creating user
                const newUser = new User({
                    name,
                    email,
                    password: await bcrypt.hash(password, 12),
                    userType: 'client',
                });
    
                // Save User data to database
                user = await newUser.save();

                await sendPassword(name, email, password);
            }

            let image;
            if(req.file) {
                image = await saveImage(req.file);
            }
            let newProducts;
            if(products.length) {
                newProducts = await Promise.all(
                    products.map((product, i) => new Product({
                        userId,
                        projectId: project._id,
                        typeId: product.typeId,
                        type: product.type,
                        gurdianId: user._id,
                        name,
                        image: {
                            front: product.pngImageFront,
                            back: product.pngImageBack,
                        },
                        colorImage: product.colorImage,
                        color2: product.color2,
                        price: product.price,
                        priceArray: product.priceArray,
                        discount: product.discount,
                        count: product.count,
                        size: size,
                        weight: product.weight,
                        description: product.description,
                        layoutImage: product.layoutImage,
                        primaryText: product.primaryText,
                        primaryColor: product.primaryColor,
                        secondaryText: product.secondaryText,
                        secondaryColor: product.secondaryColor,
                        frontImages: image ? [image] : [],   // Store the gurdian image
                        backImages: product.backImages,
                        gurdianNotifications: [],     // Store the gurdian email
                        orderColor: product.orderColor,
                        productFont: product.productFont
                    }).save())
                );
    
                newProducts.map(async (product, i) => {
                    const collections = await Collection.find({productId: products[i]._id}, {image: 1});
    
                    await new Collection({
                        userId: product.userId,
                        productId: product._id,
                        title: product.name,
                        image: collections[collections.length - 1].image
                    }).save();
                });
            }
            else {
                const order = await Order.findOne({_id: project.orderId});
                // Filter teams
                const teamOrders = order.orders.filter(order => order.type === 'team');

                // Get data of the teams
                const teams = await Promise.all(
                    teamOrders.map(order => ProductType.findOneAndUpdate({_id: order.productTypeId}, {$inc: {sellCount: 1}}))
                );
                
                const products = await Promise.all([
                    ...teamOrders.map((order, i) => new Product({
                        userId,
                        projectId: project._id,
                        typeId: order.productTypeId,
                        type: order.type,
                        gurdianId: user._id,
                        name: name,
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
            }
            
            

            await Project.findOneAndUpdate({_id: id}, {$push: {gurdianIds: user._id}, $inc: {count: -1}});
            
            // Send notification
            const users = await User.find({$or: [{userType: 'admin'}, {userType: 'iep'}]}, {_id: 1});
            const userIds = users.map(({_id}) => _id.toString());

            userIds.push(project.userId.toString());
            userIds.push(user._id.toString());

            await sendNotification('One player is added', userIds, project.orderId, project._id);
        }
        else {
            throw Error('You are not authorized');
        }

        
        res.json({
            message: `Player is added`,
        });
    }
    catch(err) {
        next(err);
    }
});



const sendPassword = async (name, email, password) => {
    try {
        // Verify Email
        const emailResult = await sendMail({
            to: email,
            subject: 'Password for login',
            text: `Your password is ${password}`,
            template: 'sendPassword',
            context: {
                username: name,
                email,
                password,
                link: `${process.env.CLIENT_URL}/login`
            }
        });

        return emailResult;
    }
    catch(error) {
        console.log(`Password is ${password}`);
    }
}


module.exports = router;