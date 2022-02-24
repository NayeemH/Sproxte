const router = require('express').Router();

const isAuth = require('../authenticate/isAuth');
const isAdmin = require('../authenticate/isAdmin');

// Import routes
const getOrder = require('./getOrder');
const productType = require('./productType');
const template = require('./template');
//const team = require('./team');


// Routes
router.use('/', getOrder);
router.use('/template', template);
router.use('/productType', productType);
//router.use('/', team);


module.exports = router;