const router = require('express').Router();

const getRateAndAddressValid = require('./getRateAndAddressVali');
const shippingLabel = require('./shippingLabel');
const tracking = require('./tracking');

const isAdmin = require('../authenticate/isAdmin');

router.use('/', getRateAndAddressValid);
router.use('/label', isAdmin, shippingLabel);
router.use('/track', tracking);

module.exports = router;