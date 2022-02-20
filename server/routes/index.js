const router = require('express').Router();

// Import routes
const user = require('./user');
//const admin = require('./admin');
const isAuth = require('./authenticate/isAuth');
const isAdmin = require('./authenticate/isAdmin');
const activate = require('./activate');
//const project = require('./projects');
const profile = require('./profile');
//const download = require('./download');
const productType = require('./productType');
const discover = require('./discover');
const template = require('./template');


// User Register and login function 
router.use('/auth', user);

// ProductType
router.use('/type', productType);

// Discover
router.use('/discover', discover);

// Template
router.use('/template', template);

// Admin need permission
//router.use('/admin', isAuth, isAdmin, admin);

// Activation routes
router.use('/activate', activate);

// Projects routes
//router.use('/project',isAuth, project);

// Profile Info
router.use('/profile', isAuth, profile);

// Profile Info
//router.use('/download', isAuth, download);


module.exports = router;