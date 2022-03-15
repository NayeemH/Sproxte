const router = require('express').Router();

// Import routes
const user = require('./user');
//const admin = require('./admin');
const isAuth = require('./authenticate/isAuth');
const isAdmin = require('./authenticate/isAdmin');
const activate = require('./activate');
const project = require('./project');
const product = require('./product');
const profile = require('./profile');
//const download = require('./download');
const categoryType = require('./categoryType');
const productType = require('./productType');
const discover = require('./discover');
const template = require('./template');
const search = require('./search');
const order = require('./order');
const payment = require('./payment');


// User Register and login function 
router.use('/auth', user);

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
router.use('/order', isAuth, order);

// payment
router.use('/payment', payment);

// Admin need permission
//router.use('/admin', isAuth, isAdmin, admin);

// Activation routes
router.use('/activate', activate);

// Projects routes
router.use('/project',isAuth, project);

// Product routes
router.use('/product',isAuth, product);

// Profile Info
router.use('/profile', isAuth, profile);

// Profile Info
//router.use('/download', isAuth, download);


module.exports = router;