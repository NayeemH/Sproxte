const router = require('express').Router();

// Import routes
const user = require('./user');
const admin = require('./admin');
const isAuth = require('./authenticate/isAuth');
const isAdmin = require('./authenticate/isAdmin');
const activate = require('./activate');
const project = require('./project');
const product = require('./product');
const profile = require('./profile');
const categoryType = require('./categoryType');
const productType = require('./productType');
const discover = require('./discover');
const template = require('./template');
const search = require('./search');
const order = require('./order');
const payment = require('./payment');
const notification = require('./notification');
const contactUs = require('./ContactUs');
const share = require('./share');
const iep = require('./iep');
const shipment = require('./shipment');
const team = require('./team');
const heroImage = require('./heroImage');


// User Register and login function 
router.use('/auth', user);

// Admin
router.use('/admin', isAuth, isAdmin, admin);

// ProductType
router.use('/category', categoryType);

// ProductType
router.use('/type', productType);

// Discover
router.use('/discover', discover);

// Template
router.use('/template', template);

// Search
router.use('/search', search);

// Order
router.use('/order', order);

// payment
router.use('/payment', payment);

// Activation routes
router.use('/activate', activate);

// Projects routes
router.use('/project',isAuth, project);

// Product routes
router.use('/product',isAuth, product);

// Profile Info
router.use('/profile', isAuth, profile);

// Notification
router.use('/notification', isAuth, notification);

// Contact us
router.use('/contact', contactUs);

// Share
router.use('/share', share);

// IEP
router.use('/iep', isAuth, iep);

// Shipment
router.use('/shipment', isAuth, shipment);

// Team info
router.use('/team', team);

// Hero image
router.use('/heroImage', heroImage);


module.exports = router;