const router = require('express').Router();

// Checking
const isAuth = require('../authenticate/isAuth');

// Import routes
const getPublishableKey = require('./getPublishableKey');
const getPaymentToken = require('./getPaymentToken');
const webhook = require('./webhook');

// Routes
router.use('/publishableKey', isAuth, getPublishableKey);
router.use('/paymentToken', isAuth, getPaymentToken);
router.use('/webhook', webhook);


module.exports = router;