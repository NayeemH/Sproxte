const router = require('express').Router();

const getRateAndAddressValid = require('./getRateAndAddressVali');
const shippingLabel = require('./shippingLabel');

const isAdmin = require('../authenticate/isAdmin');

router.use('/', getRateAndAddressValid);
router.use('/label', isAdmin, shippingLabel);


module.exports = router;