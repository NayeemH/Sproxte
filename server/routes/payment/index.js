const router = require('express').Router();

// Checking
const isAuth = require('../authenticate/isAuth');

// Import routes
const getPublishableKey = require('./getPublishableKey');
const getPaymentToken = require('./getPaymentToken');
const getPlayerAddPayToken = require('./getPlayerAddPayToken');
const webhook = require('./webhook');

// Routes
router.use('/publishableKey', getPublishableKey);
router.use('/paymentToken', getPaymentToken);
router.use('/addPlayerPaymentToken', isAuth, getPlayerAddPayToken);
router.use('/webhook', webhook);


module.exports = router;