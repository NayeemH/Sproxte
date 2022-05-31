const router = require('express').Router();

const getRateAndAddressValid = require('./getRateAndAddressVali');


router.use('/', getRateAndAddressValid);


module.exports = router;